import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://elmmngoebcmzihkwolvg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbW1uZ29lYmNtemloa3dvbHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5MDE3MDksImV4cCI6MjA0MDQ3NzcwOX0.UgBZ-fFyy-6DuJZ0prFUWc33dD1z5gZhVsyB9r8gGdw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
