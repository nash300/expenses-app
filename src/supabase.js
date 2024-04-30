// Initialize Supabase client
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fkamlshnginqinhcnwtf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrYW1sc2huZ2lucWluaGNud3RmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDQwMDgyMywiZXhwIjoyMDI5OTc2ODIzfQ.rXGSgjU1JUoH0Jv9EfHcvou7256Ea2i5EDtqLVF9WbA";
const supabase = createClient(supabaseUrl, supabaseKey);

// Export Supabase client
export default supabase;
