import { NextRequest, NextResponse } from 'next/server'
import { stripe, SERVICES, ServiceType } from '@/lib/stripe'

export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const { allowed, retryAfter } = rateLimit(ip)
    if (!allowed) {
      return NextResponse.json(
        { error: `Твърде много заявки. Опитайте отново след ${retryAfter} секунди.` },
        { status: 429 }
      )
    }

    const formData = await req.formData()
    const email = formData.get('email') as string
    const service = formData.get('service') as ServiceType
    const file = formData.get('file') as File | null
    const data = formData.get('data') as string | null

    if (!email || !service || !SERVICES[service]) {
      return NextResponse.json({ error: 'Невалидни данни.' }, { status: 400 })
    }

    // Save uploaded file if present
    let filePath: string | null = null
    if (file && file.size > 0) {
      const uploadsDir = path.join(process.cwd(), 'uploads')
      await mkdir(uploadsDir, { recursive: true })
      const buffer = Buffer.from(await file.arrayBuffer())
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      filePath = path.join(uploadsDir, fileName)
      await writeFile(filePath, buffer)
    }

    const serviceInfo = SERVICES[service]

    // Store input data for processing after payment
    const inputData = JSON.stringify({
      filePath,
      formData: data ? JSON.parse(data) : null,
    })

    // Create order in database
    const order = await prisma.order.create({
      data: {
        email,
        service,
        amount: serviceInfo.price,
        inputData,
        status: 'pending',
      },
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'bgn',
            product_data: {
              name: serviceInfo.name,
              description: serviceInfo.description,
            },
            unit_amount: serviceInfo.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/services/${service}`,
      customer_email: email,
      metadata: {
        orderId: order.id,
        service,
      },
    })

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Възникна грешка при създаване на плащането.' },
      { status: 500 }
    )
  }
}
