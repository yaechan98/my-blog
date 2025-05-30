'use client';

import { useUser } from '@clerk/nextjs';

export interface AuthStatus {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
  /**
   * 현재 사용자가 특정 리소스의 소유자인지 확인
   * @param ownerId 리소스 소유자의 ID
   */
  isOwner: (ownerId: string | null | undefined) => boolean;
  /**
   * 현재 사용자가 관리자 권한을 가지고 있는지 확인
   */
  isAdmin: boolean;
}

/**
 * 현재 사용자의 인증 상태와 권한 정보를 제공하는 커스텀 훅
 * @returns AuthStatus 객체
 */
export function useAuthStatus(): AuthStatus {
  const { user, isLoaded, isSignedIn } = useUser();
  
  // 관리자 이메일 목록 (실제 구현에서는 환경변수나 DB에서 관리)
  const ADMIN_EMAILS = ['admin@example.com'];
  
  return {
    isAuthenticated: !!isSignedIn,
    isLoading: !isLoaded,
    userId: user?.id ?? null,
    isOwner: (ownerId) => {
      if (!user?.id || !ownerId) return false;
      return user.id === ownerId;
    },
    isAdmin: !!user?.emailAddresses.some(
      email => ADMIN_EMAILS.includes(email.emailAddress)
    ),
  };
}

/**
 * 인증 상태에 따른 UI 표시 옵션
 */
export interface AuthUIOptions {
  /**
   * 인증되지 않은 사용자에게 보여줄 메시지
   * @default "로그인이 필요한 기능입니다."
   */
  unauthenticatedMessage?: string;
  /**
   * 권한이 없는 사용자에게 보여줄 메시지
   * @default "접근 권한이 없습니다."
   */
  unauthorizedMessage?: string;
  /**
   * 로딩 중일 때 보여줄 컴포넌트
   */
  loadingComponent?: React.ReactNode;
  /**
   * 인증되지 않은 사용자에게 보여줄 대체 컴포넌트
   */
  fallback?: React.ReactNode;
}
