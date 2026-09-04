import { Product } from '../types';
import { supabase } from '../lib/supabase';
import { products as seedProducts } from '../data';

const STORAGE_KEY = 'joetech_products';

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
  return cached && cached.length > 0 ? cached : seedProducts;
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
      if (data.length > 0) {
        writeCache(data as Product[]);
        return data as Product[];
      }
      // Reachable, but the table is genuinely empty, show the starter
      // catalog rather than a blank store.
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
