-- Joe Tech, Supabase schema for a NEW, dedicated project.
--
-- Run this once, in the SQL Editor of the *new* Supabase project you create
-- for Joe Tech (not the shared one). It recreates the same table shape the
-- app already reads and writes, so no code changes are needed, only the
-- .env / Vercel environment variables need to point here afterwards.

create table if not exists public.products (
  id           text primary key,
  name         text not null,
  price        numeric not null,
  description  text,
  category     text not null,
  colors       text[],
  sizes        text[],
  images       text[] not null default '{}',
  "isNew"      boolean default false,
  "isTrending" boolean default false,
  location     text,
  year         text,
  mileage      text,
  icon         text,
  specs        text[],
  condition    text,
  "isService"  boolean default false,
  "inStock"    boolean default true,
  created_at   timestamptz not null default now()
);

alter table public.products enable row level security;

-- Anyone (including signed-out shoppers) can read the catalog.
create policy "Public can read products"
  on public.products for select
  using (true);

-- Only a signed-in admin (Supabase Auth session) can add, edit, or remove.
create policy "Authenticated can insert products"
  on public.products for insert
  to authenticated
  with check (true);

create policy "Authenticated can update products"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete products"
  on public.products for delete
  to authenticated
  using (true);

-- After running this file:
-- 1. Storage: go to Storage in the sidebar → New bucket → name it exactly
--    "product-images" → mark it Public. (Product photo uploads go here.)
-- 2. Auth: go to Authentication → Users → Add user → create the admin
--    login (the email/password you want VITE_ADMIN_EMAIL / VITE_ADMIN_PASSWORD
--    to be). This is what lets you sign in to /admin.
-- 3. Settings → API: copy the Project URL and the anon public key into
--    VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (both locally in .env and
--    in Vercel → Settings → Environment Variables), then redeploy.
