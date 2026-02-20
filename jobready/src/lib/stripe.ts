import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover',
    })
  }
  return _stripe
}

export const SERVICES = {
  'cv-optimizer': {
    name: 'CV ATS Оптимизатор',
    nameEn: 'CV ATS Optimizer',
    price: 1000, // 10.00 EUR in cents
    description: 'AI оптимизация на CV за ATS системи',
  },
  'cover-letter': {
    name: 'Мотивационно писмо',
    nameEn: 'Cover Letter Generator',
    price: 800, // 8.00 EUR
    description: 'Персонализирано мотивационно писмо',
  },
  'linkedin-writer': {
    name: 'LinkedIn профил',
    nameEn: 'LinkedIn Profile Writer',
    price: 1200, // 12.00 EUR
    description: 'Оптимизиран LinkedIn профил',
  },
  combo: {
    name: 'Комбо пакет',
    nameEn: 'Combo Package',
    price: 2500, // 25.00 EUR
    description: 'CV + Мотивационно писмо + LinkedIn',
  },
} as const

export type ServiceType = keyof typeof SERVICES
