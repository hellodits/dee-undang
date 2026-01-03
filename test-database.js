// Test Database Connection
// Jalankan: node test-database.js

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  console.log('🔍 Testing database connection...\n')
  
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Test query
    const userCount = await prisma.user.count()
    console.log(`✅ Database query successful! Found ${userCount} users.`)
    
    // List tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `
    
    console.log('\n📊 Tables in database:')
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.table_name}`)
    })
    
    console.log('\n✅ Database is ready to use!')
    
  } catch (error) {
    console.error('\n❌ Database connection failed!')
    console.error('\nError details:')
    console.error(error.message)
    
    if (error.code === 'P1001') {
      console.log('\n💡 Solutions:')
      console.log('   1. Check DATABASE_URL in .env file')
      console.log('   2. Make sure database server is running')
      console.log('   3. Check firewall/antivirus settings')
      console.log('   4. Setup database manually via Supabase Dashboard')
      console.log('      → Read SETUP_MANUAL.md for instructions')
    } else if (error.code === 'P2021') {
      console.log('\n💡 Solution:')
      console.log('   Database tables not found!')
      console.log('   Run: npx prisma db push')
      console.log('   Or setup manually via Supabase Dashboard')
      console.log('   → Read SETUP_MANUAL.md for instructions')
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
