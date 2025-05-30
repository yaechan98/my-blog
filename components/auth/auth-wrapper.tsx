'use client';

import { SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useAuthStatus, type AuthUIOptions } from '@/hooks/use-auth-status';
import { Loader2 } from 'lucide-react';

interface AuthWrapperProps extends AuthUIOptions {
  /**
   * 인증이 필요한 컨텐츠
   */
  children: React.ReactNode;
  /**
   * 리소스 소유자의 ID (옵션)
   * 지정된 경우, 소유자만 접근 가능
   */
  ownerId?: string;
  /**
   * 관리자 권한이 필요한지 여부
   * @default false
   */
  requireAdmin?: boolean;
}

/**
 * 인증 상태에 따라 컨텐츠를 조건부로 표시하는 컴포넌트
 */
export function AuthWrapper({
  children,
  ownerId,
  requireAdmin = false,
  unauthenticatedMessage = "로그인이 필요한 기능입니다.",
  unauthorizedMessage = "접근 권한이 없습니다.",
  loadingComponent,
  fallback,
}: AuthWrapperProps) {
  const { isAuthenticated, isLoading, isOwner, isAdmin } = useAuthStatus();

  // 로딩 중
  if (isLoading) {
    return loadingComponent || (
      <div className="flex justify-center py-4">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  // 인증되지 않은 경우
  if (!isAuthenticated) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <p className="text-gray-600">{unauthenticatedMessage}</p>
        <SignInButton mode="modal">
          <Button variant="outline">로그인</Button>
        </SignInButton>
      </div>
    );
  }

  // 소유자 권한 체크
  if (ownerId && !isOwner(ownerId)) {
    return (
      <div className="py-8 text-center text-gray-600">
        {unauthorizedMessage}
      </div>
    );
  }

  // 관리자 권한 체크
  if (requireAdmin && !isAdmin) {
    return (
      <div className="py-8 text-center text-gray-600">
        {unauthorizedMessage}
      </div>
    );
  }

  return <>{children}</>;
}

interface UserInfoProps {
  /**
   * 사용자 ID
   */
  userId: string;
  /**
   * 사용자 이름
   */
  userName: string;
  /**
   * 사용자 이미지 URL
   */
  userImageUrl?: string;
  /**
   * 작성 시간
   */
  createdAt?: Date;
  /**
   * 수정 여부
   */
  isEdited?: boolean;
}

/**
 * 작성자 정보를 일관되게 표시하는 컴포넌트
 */
export function UserInfo({
  userId,
  userName,
  userImageUrl,
  createdAt,
  isEdited,
}: UserInfoProps) {
  const { isOwner } = useAuthStatus();
  const isCurrentUser = isOwner(userId);

  return (
    <div className="flex items-center gap-2">
      {/* 사용자 이름 */}
      <span className="font-semibold text-gray-900">
        {userName}
      </span>

      {/* 내 컨텐츠 배지 */}
      {isCurrentUser && (
        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
          내 글
        </span>
      )}

      {/* 작성 시간 */}
      {createdAt && (
        <span className="text-gray-500 text-sm">
          {createdAt.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          {isEdited && (
            <span className="text-xs text-gray-400 ml-1">(수정됨)</span>
          )}
        </span>
      )}
    </div>
  );
}
