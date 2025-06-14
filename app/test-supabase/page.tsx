"use client";

import { useEffect, useState } from "react";
import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";

// 환경변수 읽기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

export default function TestSupabasePage() {
  const { session } = useSession();
  const [jwtSub, setJwtSub] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<any>(null);
  const [supabaseError, setSupabaseError] = useState<any>(null);

  // Supabase 클라이언트: accessToken 방식
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    if (!session) return;

    const accessToken = session?.lastActiveToken?.jwt;

    // 새로운 방식: accessToken을 Supabase에 직접 전달
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      },
    });
    setSupabase(supabaseClient);

    // JWT 클레임 확인
    if (accessToken && typeof accessToken === "string") {
      try {
        const payload: any = jwtDecode(accessToken);
        setJwtSub(payload.sub || null);
        setRole(payload.role || null);
      } catch (e) {
        setJwtSub(null);
        setRole(null);
      }
    }
  }, [session]);

  // Supabase RLS 테스트: 내 정보 조회
  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("profiles")
      .select("*")
      .limit(1)
      .then(({ data, error }: { data: any[] | null; error: any }) => {
        setSupabaseUser(data ? data[0] : null);
        setSupabaseError(error);
      });
  }, [supabase]);

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Supabase Third-Party Auth 통합 테스트</h1>

      <section className="mb-8">
        <h2 className="font-semibold mb-2">환경변수 상태</h2>
        <ul className="text-sm">
          <li>
            <b>SUPABASE_URL:</b> {supabaseUrl ? <span className="text-green-600">OK</span> : <span className="text-red-600">미설정</span>}
          </li>
          <li>
            <b>SUPABASE_ANON_KEY:</b> {supabaseAnonKey ? <span className="text-green-600">OK</span> : <span className="text-red-600">미설정</span>}
          </li>
          <li>
            <b>CLERK_PUBLISHABLE_KEY:</b> {clerkPublishableKey ? <span className="text-green-600">OK</span> : <span className="text-red-600">미설정</span>}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold mb-2">Clerk 세션 및 JWT 클레임</h2>
        {session ? (
          <ul className="text-sm">
            <li>
              <b>JWT sub:</b> {jwtSub || <span className="text-gray-500">없음</span>}
            </li>
            <li>
              <b>role 클레임:</b> {role || <span className="text-gray-500">없음</span>}
            </li>
            <li>
              <b>accessToken:</b> {session?.lastActiveToken?.jwt ? <span className="text-green-600">존재</span> : <span className="text-red-600">없음</span>}
            </li>
          </ul>
        ) : (
          <div className="text-red-600">로그인 필요</div>
        )}
      </section>

      <section>
        <h2 className="font-semibold mb-2">Supabase RLS 테스트 (profiles 테이블)</h2>
        {supabaseError && (
          <div className="text-red-600 mb-2">
            오류: {supabaseError.message}
          </div>
        )}
        {supabaseUser ? (
          <pre className="bg-gray-100 p-2 rounded text-xs">{JSON.stringify(supabaseUser, null, 2)}</pre>
        ) : (
          <div className="text-gray-500">데이터 없음 또는 권한 없음</div>
        )}
      </section>
    </main>
  );
}