import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false
  }

  const credentials = Buffer.from(authHeader.slice(6), 'base64').toString()
  const [username, password] = credentials.split(':')

  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  )
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
    })
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  const stats = {
    total: orders.length,
    completed: orders.filter((o) => o.status === 'completed').length,
    pending: orders.filter((o) => o.status === 'pending').length,
    paid: orders.filter((o) => o.status === 'paid').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    failed: orders.filter((o) => o.status === 'failed').length,
    totalRevenue: orders
      .filter((o) => ['paid', 'processing', 'completed'].includes(o.status))
      .reduce((sum, o) => sum + o.amount, 0),
  }

  return NextResponse.json({ orders, stats })
}
