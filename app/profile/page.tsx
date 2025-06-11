"use client";
import { useEffect } from "react";
import useSupabaseWithClerk from "@/lib/supabaseClient";

export default function Profile() {
  const { supabase, setAuthToken } = useSupabaseWithClerk();

  useEffect(() => {
    setAuthToken().then(async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");

      if (error) {
        console.error("Supabase error:", error);
      } else {
        console.log("Profiles data:", data);
      }
    });
  }, []);

  return <div>프로필 가져오기</div>;
}