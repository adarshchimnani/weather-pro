"use server"; // This tells Next.js: "Run this code ONLY on the server"
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const cookieStore = cookies();
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  { cookies: { getAll: () => cookieStore.getAll() } }
);


export async function addFavorite(cityName) {

  // 1. Get the current logged-in user
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    // 2. Insert the city into the database
    await supabase.from('favorites').insert({
      city_name: cityName,
      user_id: user.id
    });

    // 3. Clear the cache so the new favorite shows up instantly
    revalidatePath('/weather');
  }
}

export async function deleteFavorite(favoriteId) {
  // Perform the delete operation
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('id', favoriteId); // "eq" means "equal to"

  if (!error) {
    revalidatePath('/weather'); // Refresh the list automatically
  }
}