// supabase.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ttbysnzxcdosxyveagdp.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0Ynlzbnp4Y2Rvc3h5dmVhZ2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NzUxNzIsImV4cCI6MjA4MDU1MTE3Mn0.jHP6Uho1PuvUkuUuW-Y3BfdrkdJjqb5ZbRomSs-sGmo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
