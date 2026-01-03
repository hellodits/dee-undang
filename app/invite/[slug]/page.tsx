import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import InvitationView from '@/components/InvitationView'

export default async function PublicInvitationPage({
  params,
}: {
  params: { slug: string }
}) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: params.slug },
    include: { template: true, user: true },
  })

  if (!invitation || !invitation.isPublished) {
    notFound()
  }

  // Track view
  await prisma.invitation.update({
    where: { id: invitation.id },
    data: { viewCount: { increment: 1 } },
  })

  return <InvitationView invitation={invitation} />
}
