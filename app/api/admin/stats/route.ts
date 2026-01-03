import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userRole = (session.user as any).role
    if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const [totalUsers, totalInvitations, totalRSVPs, activeSubscriptions, users] =
      await Promise.all([
        prisma.user.count(),
        prisma.invitation.count(),
        prisma.rSVP.count(),
        prisma.subscription.count({
          where: {
            status: 'ACTIVE',
            planType: { not: 'FREE' },
          },
        }),
        prisma.user.findMany({
          include: {
            subscription: true,
            _count: {
              select: { invitations: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 50,
        }),
      ])

    return NextResponse.json({
      stats: {
        totalUsers,
        totalInvitations,
        totalRSVPs,
        activeSubscriptions,
      },
      users,
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
