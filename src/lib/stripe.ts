import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error('Missing Stripe publishable key');
}

export const stripe = await loadStripe(stripePublishableKey);

export const PRICING_PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 29,
    interval: 'month',
    features: [
      'Up to 5 team members',
      'Up to 10 sites',
      'Basic reporting',
      'Mobile app access',
      'Email support',
    ],
    limits: {
      users: 5,
      sites: 10,
      api_calls: 1000,
    },
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: 99,
    interval: 'month',
    features: [
      'Up to 25 team members',
      'Unlimited sites',
      'Advanced analytics',
      'API access',
      'Priority support',
      'Custom integrations',
    ],
    limits: {
      users: 25,
      sites: -1, // unlimited
      api_calls: 10000,
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    interval: 'month',
    features: [
      'Unlimited team members',
      'Unlimited sites',
      'White-label solution',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Advanced security',
    ],
    limits: {
      users: -1, // unlimited
      sites: -1, // unlimited
      api_calls: 100000,
    },
  },
};

export const createCheckoutSession = async (priceId: string, organizationId: string) => {
  const response = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      organizationId,
      successUrl: `${window.location.origin}/billing/success`,
      cancelUrl: `${window.location.origin}/billing`,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  return response.json();
};

export const createPortalSession = async (customerId: string) => {
  const response = await fetch('/api/stripe/create-portal-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      returnUrl: `${window.location.origin}/billing`,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create portal session');
  }

  return response.json();
};