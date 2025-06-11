// lib/supabaseClient.ts

import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function useSupabaseWithClerk() {
  const { getToken } = useAuth();

  async function setAuthToken() {
    const token = await getToken({ template: "supabase" });
    if (token) {
      await supabase.auth.setSession({ access_token: token, refresh_token: "" });
    } else {
      throw new Error("Clerk JWT 토큰을 가져오지 못했습니다.");
    }
  }

  return { supabase, setAuthToken };
}
