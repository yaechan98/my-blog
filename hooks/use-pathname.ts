'use client';

import { usePathname } from 'next/navigation';

/**
 * 현재 페이지 경로를 감지하는 커스텀 훅
 * 네비게이션에서 활성 상태 표시에 사용
 */
export function useCurrentPath() {
  const pathname = usePathname();
  
  /**
   * 주어진 경로가 현재 활성 경로인지 확인
   * @param path - 확인할 경로
   * @returns 활성 상태 여부
   */
  const isActivePath = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return {
    pathname,
    isActivePath,
  };
} 