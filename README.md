# Joe Tech

Online gadget store for **Joe Tech**: iPhones and iPads, Android phones, laptops and tablets,
phone and laptop accessories, gaming monitors/chairs/desks, solar machines and devices, plus
repair and maintenance services.

Branches: **Akuroad Market, Nsukka (Enugu State)** and **Pepple Street, Ikeja (Lagos State)**.

Built with Vite + React 19 + Tailwind 4, Firebase (customer auth) and Supabase (products + admin).

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:3000>.

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint      # typecheck (tsc --noEmit)
```

## Where to change things

Almost everything a non-developer needs to edit lives in **`src/config/site.ts`**:

| What | Where |
| --- | --- |
| Phone numbers, email, WhatsApp | `contacts`, `site.email` in `src/config/site.ts` |
| Branch addresses and opening hours | `branches` in `src/config/site.ts` |
| **Bank account for checkout** | `bankDetails` in `src/config/site.ts` |
| Product categories | `marketplaceCategories` in `src/data.ts` |
| Starter/placeholder products | `products` in `src/data.ts` |
| Repair services and prices | `repairServices` in `src/data.ts` |
| Brand colours and fonts | `@theme` block in `src/index.css` |

> **Before going live:** replace the placeholder values in `bankDetails`. Until you do, the
> checkout page shows a visible warning instead of real account details.

## Products

Products come from the Supabase `products` table, managed from the admin dashboard at
`/admin` (or `#admin`).

**Important:** the Supabase project currently configured here is shared with another live
business, so its `products` table also holds that project's real inventory. The storefront only
shows products whose `category` matches one of the eight Joe Tech category ids in `src/data.ts`,
so customers never see the other project's items, but the admin dashboard is not isolated: adding,
editing, or deleting a product touches the same shared table. Run `supabase-setup.sql` in a new,
dedicated Supabase project for Joe Tech, then point `VITE_SUPABASE_URL` /
`VITE_SUPABASE_ANON_KEY` at it, to fully separate the two.

If no products match, the starter catalog in `src/data.ts` is shown so the shop is never empty.

## Environment

Copy `.env.example` to `.env` and fill in:

- `VITE_FIREBASE_*`: customer sign in / sign up
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`: products and admin auth
- `VITE_ADMIN_EMAIL`, `VITE_ADMIN_PASSWORD`: admin dashboard login
- `VITE_GEMINI_API_KEY`: optional, powers the AI chat assistant
- `VITE_EMAILJS_*`: optional, visitor sign-in email alerts

## Deployment

Deployed on Vercel. `vercel.json` sets the Vite framework preset, `dist` output and the SPA
rewrite so client-side routes (`/categories`, `/services`, `/checkout`, etc.) resolve correctly.
