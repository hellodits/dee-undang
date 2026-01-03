import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    let templates = await prisma.template.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Filter premium templates based on subscription
    if (session?.user) {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: (session.user as any).id },
      })

      if (subscription?.planType === 'FREE') {
        templates = templates.filter((t) => !t.isPremium)
      }
    } else {
      templates = templates.filter((t) => !t.isPremium)
    }

    return NextResponse.json(templates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}
