import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const orderId = session.metadata?.orderId
    if (!orderId) {
      console.error('No orderId in session metadata')
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 })
    }

    try {
      // Update order status to paid
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'paid' },
      })

      // Trigger async processing
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      fetch(`${baseUrl}/api/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      }).catch((err) => {
        console.error('Failed to trigger processing:', err)
      })
    } catch (err) {
      console.error('Failed to update order:', err)
      return NextResponse.json({ error: 'Processing error' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
