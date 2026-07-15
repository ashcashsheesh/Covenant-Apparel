# Covenant Apparel

A custom e-commerce website for Covenant Apparel — a faith-rooted clothing brand with clean, aesthetic designs.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **Supabase** (products, orders, storage)
- **Stripe Checkout** (payments — no monthly fee)
- **Resend** (transactional email)

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site works out of the box with seed product data. Connect Supabase and Stripe when you're ready to accept real orders.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | For DB | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For DB | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | For orders/admin | Supabase service role key |
| `STRIPE_SECRET_KEY` | For checkout | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | For orders | Stripe webhook signing secret |
| `RESEND_API_KEY` | For email | Resend API key |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | For admin | Password for `/admin` dashboard |
| `NEXT_PUBLIC_SITE_URL` | For SEO | Production site URL |

## Database Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/schema.sql` in the Supabase SQL Editor
3. Add your Supabase keys to `.env.local`

## Stripe Setup

1. Create an account at [stripe.com](https://stripe.com)
2. Add `STRIPE_SECRET_KEY` to `.env.local`
3. For local webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Admin Dashboard

Visit `/admin/login` and sign in with your `NEXT_PUBLIC_ADMIN_PASSWORD`.

From the dashboard you can:
- View and manage products
- View orders after Stripe checkout

## Deploy

Deploy to [Vercel](https://vercel.com):

1. Push to GitHub
2. Import the repo in Vercel
3. Add all environment variables
4. Connect your custom domain

## Pages

- `/` — Homepage
- `/shop` — Product catalog with filters
- `/shop/[slug]` — Product detail
- `/cart` — Shopping cart
- `/about`, `/lookbook`, `/faq`, `/contact`, `/size-guide`
- `/shipping-returns`, `/privacy`, `/terms`
- `/admin` — Admin dashboard
