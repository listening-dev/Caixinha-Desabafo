import { createClient } from '@supabase/supabase-js'

// We use the server-side environment variables to keep keys secure if possible,
// though ANON key is technically public safe, we prefer not to expose it if not needed.
// However, 'createClient' without 'auth' storage might be needed for server-side stateless usage.

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables: SUPABASE_URL or SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false, // Essential for anonymous server-side usage
    }
})
