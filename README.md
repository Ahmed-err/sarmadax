# Sarmadax

Boutique digital agency website. Built with Next.js 16, next-intl (EN/AR), Framer Motion, Three.js/R3F, and Tailwind CSS v4.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes | Contact form email delivery (resend.com) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics (leave blank to disable) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification |

## Deployment (Vercel)

1. Push to GitHub, connect the repo in Vercel.
2. Add the env vars above in the Vercel project settings.
3. In Resend → Domains, verify `sarmadax.com` (SPF + DKIM) so outbound mail from `hello@sarmadax.com` delivers reliably.
4. Rotate `RESEND_API_KEY` after any exposure.

## Locales

English is served at `/` (no prefix). Arabic at `/ar/`.  
Switch language via the `AR`/`EN` toggle in the navbar — it navigates to the same path in the other locale.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `node scripts/compress-images.mjs` | Re-compress `public/images/*.png` with sharp |
