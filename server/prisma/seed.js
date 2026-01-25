import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@nexalyze.com' },
    update: {},
    create: {
      email: 'demo@nexalyze.com',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'User'
    }
  })

  console.log('✅ User created:', user.email)

  // Create workspace
  const workspace = await prisma.workspace.upsert({
    where: { slug: 'demo-workspace' },
    update: {},
    create: {
      name: 'Demo Workspace',
      slug: 'demo-workspace',
      userId: user.id
    }
  })

  console.log('✅ Workspace created:', workspace.name)

  // Create sample analytics data for the last 30 days
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const sources = ['organic', 'paid', 'direct', 'referral']
  const platforms = ['desktop', 'mobile', 'tablet']

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    for (const source of sources) {
      for (const platform of platforms) {
        await prisma.analyticsData.create({
          data: {
            workspaceId: workspace.id,
            date: new Date(date.setHours(0, 0, 0, 0)),
            visitors: Math.floor(Math.random() * 1000) + 100,
            uniqueVisitors: Math.floor(Math.random() * 800) + 50,
            pageViews: Math.floor(Math.random() * 3000) + 500,
            bounceRate: Math.random() * 70 + 20,
            avgSessionDuration: Math.floor(Math.random() * 300) + 60,
            conversionRate: Math.random() * 5 + 0.5,
            revenue: Math.random() * 5000 + 500,
            source,
            platform
          }
        })
      }
    }
  }

  console.log('✅ Sample analytics data created')
  console.log('📊 Demo credentials: demo@nexalyze.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('✨ Seed completed!')
  })
