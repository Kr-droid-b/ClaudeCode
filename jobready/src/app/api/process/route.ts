import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
import { optimizeCV, generateCoverLetter, generateLinkedInProfile } from '@/lib/ai'
import { generateCVPdf, generateCoverLetterPdf, generateLinkedInPdf } from '@/lib/pdf'
import { sendResultEmail } from '@/lib/email'
import { readFile, unlink } from 'fs/promises'
import mammoth from 'mammoth'

async function extractTextFromFile(filePath: string): Promise<string> {
  const buffer = await readFile(filePath)

  if (filePath.endsWith('.docx')) {
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  }

  // For PDF, do a basic text extraction
  // pdf-lib doesn't support text extraction, so we use a simple approach
  const text = buffer.toString('utf-8')
  // Try to extract readable text from PDF binary
  const cleanText = text
    .replace(/[^\x20-\x7E\n\r\t\u0400-\u04FF\u00C0-\u024F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (cleanText.length < 50) {
    return 'Unable to extract text from PDF. Please try uploading a .docx file instead.'
  }

  return cleanText
}

async function processCV(order: { id: string; email: string; inputData: string }) {
  const input = JSON.parse(order.inputData)
  const cvText = await extractTextFromFile(input.filePath)

  const optimized = await optimizeCV(cvText)
  const pdfBuffer = await generateCVPdf(optimized)

  await sendResultEmail(order.email, 'cv-optimizer', pdfBuffer, 'CV_ATS_Optimized.pdf')

  // Clean up uploaded file
  try {
    await unlink(input.filePath)
  } catch {}

  return pdfBuffer
}

async function processCoverLetter(order: { id: string; email: string; inputData: string }) {
  const input = JSON.parse(order.inputData)
  const formData = input.formData

  const letterText = await generateCoverLetter({
    jobTitle: formData.jobTitle,
    companyName: formData.companyName,
    skills: formData.skills,
    yearsExperience: formData.yearsExperience,
    achievement: formData.achievement,
    language: formData.language || 'en',
  })

  const pdfBuffer = await generateCoverLetterPdf(letterText)

  await sendResultEmail(order.email, 'cover-letter', pdfBuffer, 'Cover_Letter.pdf')

  return pdfBuffer
}

async function processLinkedIn(order: { id: string; email: string; inputData: string }) {
  const input = JSON.parse(order.inputData)
  const formData = input.formData

  const profile = await generateLinkedInProfile({
    jobTitle: formData.jobTitle,
    industry: formData.industry,
    yearsExperience: formData.yearsExperience,
    skills: formData.skills,
    background: formData.background,
  })

  const pdfBuffer = await generateLinkedInPdf(profile)

  await sendResultEmail(order.email, 'linkedin-writer', pdfBuffer, 'LinkedIn_Profile.pdf')

  return pdfBuffer
}

async function processCombo(order: { id: string; email: string; inputData: string }) {
  const input = JSON.parse(order.inputData)
  const formData = input.formData

  // Process CV
  const cvText = await extractTextFromFile(input.filePath)
  const optimizedCV = await optimizeCV(cvText)
  const cvPdf = await generateCVPdf(optimizedCV)

  // Process Cover Letter
  const letterText = await generateCoverLetter({
    jobTitle: formData.jobTitle,
    companyName: formData.companyName,
    skills: formData.skills,
    yearsExperience: formData.yearsExperience,
    achievement: formData.achievement,
    language: formData.language || 'en',
  })
  const coverLetterPdf = await generateCoverLetterPdf(letterText)

  // Process LinkedIn
  const profile = await generateLinkedInProfile({
    jobTitle: formData.jobTitle,
    industry: formData.industry,
    yearsExperience: formData.yearsExperience,
    skills: formData.skills,
    background: formData.background,
  })
  const linkedInPdf = await generateLinkedInPdf(profile)

  // Send all three via email
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    to: order.email,
    subject: 'Вашият Комбо пакет е готов! | JobReady.bg',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1a2332; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">JobReady.bg</h1>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1a2332;">Вашият Комбо пакет е готов!</h2>
          <p>Прикачени са всичките три документа:</p>
          <ul>
            <li>CV ATS Optimized (PDF)</li>
            <li>Cover Letter (PDF)</li>
            <li>LinkedIn Profile (PDF)</li>
          </ul>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">© ${new Date().getFullYear()} JobReady.bg</p>
        </div>
      </div>
    `,
    attachments: [
      { filename: 'CV_ATS_Optimized.pdf', content: cvPdf },
      { filename: 'Cover_Letter.pdf', content: coverLetterPdf },
      { filename: 'LinkedIn_Profile.pdf', content: linkedInPdf },
    ],
  })

  // Clean up uploaded file
  try {
    await unlink(input.filePath)
  } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 })
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.status !== 'paid') {
      return NextResponse.json({ error: 'Order not paid' }, { status: 400 })
    }

    // Update status to processing
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'processing' },
    })

    try {
      switch (order.service) {
        case 'cv-optimizer':
          await processCV(order as { id: string; email: string; inputData: string })
          break
        case 'cover-letter':
          await processCoverLetter(order as { id: string; email: string; inputData: string })
          break
        case 'linkedin-writer':
          await processLinkedIn(order as { id: string; email: string; inputData: string })
          break
        case 'combo':
          await processCombo(order as { id: string; email: string; inputData: string })
          break
        default:
          throw new Error(`Unknown service: ${order.service}`)
      }

      // Update status to completed
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'completed' },
      })

      return NextResponse.json({ success: true })
    } catch (processingError) {
      console.error('Processing error:', processingError)

      // Update status to failed
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'failed' },
      })

      return NextResponse.json(
        { error: 'Processing failed. Our team has been notified.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Process route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
