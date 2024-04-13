import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SP_URL as string,
  process.env.SP_ANON as string
);
