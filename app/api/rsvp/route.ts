import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { invitationId, name, email, phone, guestCount, attendance, message } =
      await req.json()

    if (!invitationId || !name) {
      return NextResponse.json(
        { error: 'Invitation ID and name are required' },
        { status: 400 }
      )
    }

    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    })

    if (!invitation || !invitation.isPublished) {
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 }
      )
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        invitationId,
        name,
        email,
        phone,
        guestCount: guestCount || 1,
        attendance: attendance || 'YES',
        message,
      },
    })

    return NextResponse.json(rsvp, { status: 201 })
  } catch (error) {
    console.error('Error creating RSVP:', error)
    return NextResponse.json(
      { error: 'Failed to submit RSVP' },
      { status: 500 }
    )
  }
}
