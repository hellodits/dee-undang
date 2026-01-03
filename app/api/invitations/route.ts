import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const invitations = await prisma.invitation.findMany({
      where: { userId: (session.user as any).id },
      include: {
        template: true,
        _count: {
          select: { rsvps: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(invitations)
  } catch (error) {
    console.error('Error fetching invitations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invitations' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { title, templateId } = await req.json()

    // Check subscription limits
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    })

    const activeInvitations = await prisma.invitation.count({
      where: { userId, isPublished: true },
    })

    const limits = { FREE: 1, STANDARD: 5, PREMIUM: 20 }
    const limit = limits[subscription?.planType || 'FREE']

    if (activeInvitations >= limit) {
      return NextResponse.json(
        { error: 'Invitation limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    const template = await prisma.template.findUnique({
      where: { id: templateId },
    })

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    const baseSlug = generateSlug(title)
    let slug = baseSlug
    let counter = 1

    while (await prisma.invitation.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const templateConfig = template.config as any
    
    const invitation = await prisma.invitation.create({
      data: {
        userId,
        templateId,
        title,
        slug,
        config: {
          ...templateConfig,
          title,
          groomName: '',
          brideName: '',
          date: '',
          time: '',
          venue: '',
          venueAddress: '',
          story: '',
          photos: [],
        },
      },
      include: { template: true },
    })

    return NextResponse.json(invitation, { status: 201 })
  } catch (error) {
    console.error('Error creating invitation:', error)
    return NextResponse.json(
      { error: 'Failed to create invitation' },
      { status: 500 }
    )
  }
}
