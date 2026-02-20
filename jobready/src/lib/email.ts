import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendResultEmail(
  to: string,
  service: string,
  pdfBuffer: Buffer,
  fileName: string
) {
  const serviceNames: Record<string, string> = {
    'cv-optimizer': 'CV ATS Оптимизатор',
    'cover-letter': 'Мотивационно писмо',
    'linkedin-writer': 'LinkedIn профил',
    combo: 'Комбо пакет',
  }

  const serviceName = serviceNames[service] || service

  await resend.emails.send({
    from: 'JobReady.bg <noreply@jobready.bg>',
    to,
    subject: `Вашият ${serviceName} е готов! | JobReady.bg`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1a2332; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">JobReady.bg</h1>
          <p style="color: #94a3b8; margin: 5px 0 0;">AI-Powered Career Documents</p>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1a2332; margin-top: 0;">Вашият ${serviceName} е готов!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Благодарим ви, че използвахте JobReady.bg! Вашият документ е прикачен към този имейл.
          </p>
          <p style="color: #475569; line-height: 1.6;">
            <strong>Съвети:</strong>
          </p>
          <ul style="color: #475569; line-height: 1.8;">
            <li>Прегледайте документа и добавете вашите лични данни</li>
            <li>Персонализирайте съдържанието за конкретната позиция</li>
            <li>Проверете всички факти и дати</li>
          </ul>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} JobReady.bg — AI Кариерни Документи
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: fileName,
        content: pdfBuffer,
      },
    ],
  })
}
