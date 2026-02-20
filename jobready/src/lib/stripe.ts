import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

export const SERVICES = {
  'cv-optimizer': {
    name: 'CV ATS Оптимизатор',
    nameEn: 'CV ATS Optimizer',
    price: 1000, // 10.00 BGN in stotinki
    description: 'AI оптимизация на CV за ATS системи',
  },
  'cover-letter': {
    name: 'Мотивационно писмо',
    nameEn: 'Cover Letter Generator',
    price: 800, // 8.00 BGN
    description: 'Персонализирано мотивационно писмо',
  },
  'linkedin-writer': {
    name: 'LinkedIn профил',
    nameEn: 'LinkedIn Profile Writer',
    price: 1200, // 12.00 BGN
    description: 'Оптимизиран LinkedIn профил',
  },
  combo: {
    name: 'Комбо пакет',
    nameEn: 'Combo Package',
    price: 2500, // 25.00 BGN
    description: 'CV + Мотивационно писмо + LinkedIn',
  },
} as const

export type ServiceType = keyof typeof SERVICES
