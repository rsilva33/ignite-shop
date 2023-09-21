import Stripe from 'stripe'

export const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
  apiVersion: '2023-08-16',
  appInfo: {
    name: 'Ignite Shop',
  },
})