import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://mqoanwznckjfrxhcuxne.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xb2Fud3puY2tqZnJ4aGN1eG5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNjAyNjgsImV4cCI6MjA0MjgzNjI2OH0.sBbJnuL6JkNri3lWbIMFPaEgFfh4bjaHF6X4rQNOTII";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
