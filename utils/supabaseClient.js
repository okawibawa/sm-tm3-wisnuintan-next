import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  'https://xkwpictlhsutjcrciiaq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd3BpY3RsaHN1dGpjcmNpaWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcwOTYyMjQsImV4cCI6MTk2MjY3MjIyNH0.dkYmYinUrIp39cEEG7YvBiWHKPQcCw5Fy7PQHF9sGKc'
);
