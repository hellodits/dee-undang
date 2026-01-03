import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    invitationLimit: 1,
    features: ['1 active invitation', 'Basic templates', 'Platform branding'],
  },
  STANDARD: {
    name: 'Standard',
    price: 9.99,
    priceId: 'price_standard_monthly',
    invitationLimit: 5,
    features: [
      '5 active invitations',
      'All templates',
      'Remove watermark',
      'Basic analytics',
    ],
  },
  PREMIUM: {
    name: 'Premium',
    price: 29.99,
    priceId: 'price_premium_monthly',
    invitationLimit: 20,
    features: [
      '20 active invitations',
      'All premium templates',
      'Custom URL patterns',
      'Priority support',
      'Advanced analytics',
    ],
  },
}
