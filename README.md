# MADELEINE — landing & pre-order

Marketing site and Original Bespoke pre-order flow for [MADELEINE](https://madeleine.uk).

## Stack

- **Frontend:** React 18 + Vite + Tailwind
- **Checkout API:** Express + Stripe Checkout (`server/`)

## Local development

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Add your [Stripe test keys](https://dashboard.stripe.com/test/apikeys) to `.env`:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET` (optional locally — use Stripe CLI, see below)

3. Start the client and API together:

```bash
npm run dev
```

- Vite: `http://localhost:5173`
- API: `http://localhost:4242` (proxied via `/api` in dev)

## Stripe webhook (local)

```bash
stripe listen --forward-to localhost:4242/api/webhook
```

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Order flow

1. User completes the questionnaire on `/product/original-bespoke`
2. `POST /api/checkout` stores the brief and creates a Stripe Checkout session
3. User pays on Stripe → redirected to `/order/confirmation?session_id=…`
4. Webhook marks the order as paid in `server/data/orders/`
5. Confirmation email sent to the customer (+ copy to `ORDERS_EMAIL_TO`) via Resend

## Confirmation emails

Set `RESEND_API_KEY`, `EMAIL_FROM`, and `ORDERS_EMAIL_TO` in `.env`. Emails are triggered on Stripe `checkout.session.completed`, with a fallback when the confirmation page loads.

## Analytics

Optional — set in `.env`:

- `VITE_PLAUSIBLE_DOMAIN=madeleine.uk` — Plausible
- `VITE_GA4_MEASUREMENT_ID=G-…` — Google Analytics 4

CTA events: `cta_pre_order`, `cta_personalise_open`, `cta_checkout_start`, `contact_submit`.

## Social

- `VITE_INSTAGRAM_URL` — footer + Organization schema (`sameAs`)

## Production

Deploy the Vite `dist/` folder for the static site **and** run the Express API (`npm run start:api`) with:

- `CLIENT_URL` / `VITE_SITE_ORIGIN` → your public URL
- `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` (live mode)
- `VITE_API_URL` → public API origin if different from the site (or same host with reverse proxy to `/api`)

Configure the Stripe webhook endpoint: `https://your-api-host/api/webhook`
