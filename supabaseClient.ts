// @ts-nocheck
const { createClient } = supabase;

// The user provided a DB connection string, from which the project URL is derived.
const SUPABASE_URL = 'https://vtrvxkacuhjpaijrfsgx.supabase.co';

// IMPORTANT: Replace this placeholder with your actual Supabase anon key.
// You can find this in your Supabase project settings under "API".
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn('Supabase anon key is not set. Authentication will not work. Please add it to supabaseClient.ts');
}

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
