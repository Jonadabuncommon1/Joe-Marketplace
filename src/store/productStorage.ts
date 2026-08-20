import { Product } from '../types';
import { supabase } from '../lib/supabase';
import { products as seedProducts, marketplaceCategories } from '../data';

const STORAGE_KEY = 'joetech_products';

const KNOWN_CATEGORIES = new Set(marketplaceCategories.map((c) => c.id));

/**
 * This Supabase project is currently shared with another live business, so its
 * `products` table holds rows that belong to that project, not Joe Tech
 * (clothing, cars, provisions). Do NOT delete them, they are someone else's
 * real inventory. This filter just keeps them off the Joe Tech storefront.
 *
 * The real fix is to move Joe Tech onto its own dedicated Supabase project,
 * see supabase-setup.sql at the repo root, which also protects the admin
 * dashboard from editing or deleting the other project's products by mistake.
 */
function keepJoeTechProducts(rows: Product[]): Product[] {
  return rows.filter((p) => p.category && KNOWN_CATEGORIES.has(p.category));
}

/** Legacy keys from earlier builds, read once so returning visitors keep their data. */
const LEGACY_KEYS = ['Joe Tech_products', 'Joe Marketplace_products'];

function readCache(): Product[] | null {
  for (const key of [STORAGE_KEY, ...LEGACY_KEYS]) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as Product[];
    } catch {
      // Corrupt or unavailable, fall through to the next key.
    }
  }
  return null;
}

function writeCache(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // Storage full or blocked, the app works fine without the cache.
  }
}

/**
 * Products to render before the network responds: the cached set if we have
 * one, otherwise the starter catalog so the storefront is never empty.
 */
export function getInitialProductsFromStorage(): Product[] {
  const cached = readCache();
  if (!cached) return seedProducts;
  const relevant = keepJoeTechProducts(cached);
  return relevant.length > 0 ? relevant : seedProducts;
}

export async function fetchProductsFromDB(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error.message);
    } else if (data) {
      const relevant = keepJoeTechProducts(data as Product[]);
      if (relevant.length > 0) {
        writeCache(relevant);
        return relevant;
      }
      // Reachable, but nothing stocked under a Joe Tech category yet, show the
      // starter catalog rather than an empty store.
      return seedProducts;
    }
  } catch (err) {
    console.error('Supabase fetch failed:', err);
  }

  return readCache() ?? seedProducts;
}

export async function addProductToDB(product: Product): Promise<void> {
  try {
    const { error } = await supabase.from('products').insert([product]);
    if (error) throw error;
    writeCache([product, ...(readCache() ?? [])]);
  } catch (error: any) {
    console.error('Error adding product to Supabase:', error);
    // Keep it locally so the admin's work is not lost, then surface the error.
    writeCache([product, ...(readCache() ?? [])]);
    throw error;
  }
}

export async function updateProductInDB(id: string, updates: Partial<Product>): Promise<void> {
  try {
    const { error } = await supabase.from('products').update(updates).eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error updating product:', error);
  }

  const cached = readCache();
  if (cached) {
    writeCache(cached.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }
}

export async function deleteProductFromDB(id: string): Promise<void> {
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting product:', error);
  }

  const cached = readCache();
  if (cached) {
    writeCache(cached.filter((p) => p.id !== id));
  }
}

export function createProductId(): string {
  return `prod-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
