import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ data: { user: null, session: null }, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
        updateUser: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
      },
      from: () => ({
        select: () => ({
          order: () => Promise.resolve({ data: [], error: null }),
        }),
        insert: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        update: () => ({
          eq: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        }),
        delete: () => ({
          eq: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        }),
      }),
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: new Error('Supabase not configured') }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as any);

export async function uploadImage(file: File): Promise<string | null> {
  if (!file) return null;

  const toBase64 = (f: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase not configured, falling back to base64 encoding for image.');
      return await toBase64(file);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image to Supabase:', uploadError.message);
      return await toBase64(file);
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error('Unexpected error during Supabase upload:', err);
    return await toBase64(file).catch(() => null);
  }
}
