# Digital Invitation SaaS Platform

A full-stack SaaS application for creating and managing beautiful digital invitations for weddings and events.

## Features

- 🎨 **Beautiful Templates** - 5 professionally designed templates (Classic, Minimalist, Elegant, Pastel, Dark)
- ✏️ **Intuitive Editor** - Easy-to-use invitation builder with live preview
- 📱 **Mobile-First Design** - Fully responsive invitations that look great on all devices
- 💳 **Subscription Plans** - Free, Standard, and Premium tiers with Stripe integration
- 📊 **RSVP Management** - Built-in RSVP forms with guest tracking
- 📈 **Analytics** - Track views and responses for each invitation
- 🔐 **Multi-Tenant** - Secure user authentication with NextAuth
- 🎵 **Background Music** - Optional music for invitations
- ⏱️ **Countdown Timer** - Live countdown to event date
- 🔗 **Unique URLs** - Each invitation gets a shareable URL

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Email + Google OAuth)
- **Payments**: Stripe
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Stripe account (for payments)
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd digital-invitation-saas
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for local)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `NEXT_PUBLIC_APP_URL` - Your app URL

Optional:
- `GOOGLE_CLIENT_ID` - For Google OAuth
- `GOOGLE_CLIENT_SECRET` - For Google OAuth
- Cloudinary credentials for image uploads

4. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database with templates and demo data
npx prisma db seed
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Accounts

After seeding, you can use these accounts:

- **User**: demo@example.com / password123
- **Admin**: admin@example.com / password123

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── editor/            # Invitation editor
│   ├── invite/            # Public invitation pages
│   └── pricing/           # Pricing page
├── components/            # React components
├── lib/                   # Utility functions and configs
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── stripe.ts         # Stripe configuration
│   ├── templates.ts      # Template definitions
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Prisma schema
│   └── seed.ts           # Database seed script
└── public/               # Static assets
```

## Database Schema

Key models:
- **User** - User accounts with role-based access
- **Subscription** - User subscription plans and status
- **Template** - Invitation templates
- **Invitation** - User-created invitations
- **RSVP** - Guest responses
- **InvitationView** - Analytics tracking

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Invitations
- `GET /api/invitations` - List user's invitations
- `POST /api/invitations` - Create new invitation
- `GET /api/invitations/[id]` - Get invitation details
- `PATCH /api/invitations/[id]` - Update invitation
- `DELETE /api/invitations/[id]` - Delete invitation

### Templates
- `GET /api/templates` - List available templates

### RSVP
- `POST /api/rsvp` - Submit RSVP (public)
- `GET /api/rsvp/[invitationId]` - Get RSVPs for invitation

### Subscription
- `GET /api/subscription` - Get user subscription
- `POST /api/subscription/checkout` - Create Stripe checkout session

### Webhooks
- `POST /api/webhooks/stripe` - Stripe webhook handler

## Subscription Plans

### Free
- 1 active invitation
- Basic templates
- Platform branding

### Standard ($9.99/month)
- 5 active invitations
- All templates
- Remove watermark
- Basic analytics

### Premium ($29.99/month)
- 20 active invitations
- All premium templates
- Custom URL patterns
- Priority support
- Advanced analytics

## Stripe Setup

1. Create products and prices in Stripe Dashboard
2. Update price IDs in `lib/stripe.ts`
3. Set up webhook endpoint: `/api/webhooks/stripe`
4. Add webhook secret to `.env`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Railway
- Render
- AWS
- DigitalOcean

## Development

### Adding New Templates

1. Add template definition to `lib/templates.ts`
2. Run seed script to add to database
3. Template will be available in the editor

### Customizing Themes

Templates use a JSON configuration:
```typescript
{
  colors: {
    primary: '#color',
    secondary: '#color',
    accent: '#color',
    background: '#color',
    text: '#color'
  },
  fonts: {
    heading: 'Font Name',
    body: 'Font Name'
  },
  sections: {
    hero: true,
    names: true,
    // ... other sections
  }
}
```

## Security

- Passwords hashed with bcrypt
- Server-side validation on all endpoints
- Role-based authorization
- Protected API routes
- CSRF protection via NextAuth

## Support

For issues and questions, please open an issue on GitHub.

## License

MIT License - feel free to use this project for your own purposes.
