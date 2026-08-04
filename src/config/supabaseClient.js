import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ntkbzbqdgeaeaouvrwhr.supabase.co'
const supabaseAnonKey = 'sb_publishable_oqSolK5dk9dMjL1uqExKqw_CTtMp_sR' // MUST BE THE ANON KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)