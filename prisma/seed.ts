import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { DEFAULT_TEMPLATES } from '../lib/templates'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create templates
  console.log('Creating templates...')
  for (const template of DEFAULT_TEMPLATES) {
    await prisma.template.upsert({
      where: { slug: template.slug },
      update: {},
      create: {
        name: template.name,
        slug: template.slug,
        description: template.description || '',
        category: template.category,
        isPremium: template.isPremium,
        thumbnail: template.thumbnail || '',
        config: template.config as any,
      },
    })
  }

  // Create demo users
  console.log('Creating demo users...')

  const demoPassword = await bcrypt.hash('password123', 10)

  const user1 = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: demoPassword,
      role: 'USER',
      subscription: {
        create: {
          planType: 'FREE',
          status: 'ACTIVE',
        },
      },
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: demoPassword,
      role: 'ADMIN',
      subscription: {
        create: {
          planType: 'PREMIUM',
          status: 'ACTIVE',
        },
      },
    },
  })

  // Create sample invitations
  console.log('Creating sample invitations...')

  const classicTemplate = await prisma.template.findUnique({
    where: { slug: 'classic-wedding' },
  })

  if (classicTemplate) {
    const templateConfig = classicTemplate.config as any
    
    await prisma.invitation.create({
      data: {
        userId: user1.id,
        templateId: classicTemplate.id,
        slug: 'john-and-jane-wedding',
        title: "John & Jane's Wedding",
        isPublished: true,
        config: {
          ...templateConfig,
          title: "John & Jane's Wedding",
          groomName: 'John Smith',
          brideName: 'Jane Doe',
          date: '2024-12-25',
          time: '15:00',
          venue: 'Grand Hotel Ballroom',
          venueAddress: '123 Main Street, New York, NY 10001',
          story:
            'We met in college and have been inseparable ever since. After 5 wonderful years together, we are excited to celebrate our love with family and friends.',
          photos: [],
        },
      },
    })
  }

  console.log('✅ Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
