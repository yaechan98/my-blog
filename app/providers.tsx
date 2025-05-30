'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { type ReactNode } from 'react';

/**
 * 전역 프로바이더 컴포넌트
 * - ClerkProvider: 인증 상태 관리
 */
export function Providers({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary: '#0F172A',
          colorTextOnPrimaryBackground: '#FFFFFF',
        },
      }}
      localization={{
        locale: 'ko-KR',
        socialButtonsBlockButton: '{{provider}}로 계속하기',
        signIn: {
          start: {
            title: '로그인',
            subtitle: '계정에 로그인하여 계속하세요',
          },
        },
        signUp: {
          start: {
            title: '회원가입',
            subtitle: '계정을 만들어 시작하세요',
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
