/**
 * 포스트 상세 페이지 404 에러 페이지
 * 존재하지 않는 포스트에 접근했을 때 표시
 */

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '포스트를 찾을 수 없습니다 | My Blog',
  description: '요청하신 포스트를 찾을 수 없습니다.',
};

export default function PostNotFound() {
  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 아이콘 */}
        <div className="text-8xl mb-8">📄</div>
        
        {/* 제목 */}
        <h1 className="text-4xl font-bold mb-4">포스트를 찾을 수 없습니다</h1>
        
        {/* 설명 */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          요청하신 포스트가 존재하지 않거나 삭제되었을 수 있습니다.<br />
          URL을 다시 확인하거나 다른 글을 둘러보세요.
        </p>
        
        {/* 액션 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/posts"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            📚 모든 글 보기
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            📁 카테고리 둘러보기
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            🏠 홈으로 돌아가기
          </Link>
        </div>
        
        {/* 추가 도움말 */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-lg font-semibold mb-4">대신 이런 글들은 어떠세요?</h2>
          <p className="text-sm text-muted-foreground">
            <Link href="/posts?sort=popular" className="text-primary hover:underline">
              인기 글
            </Link>
            {' | '}
            <Link href="/posts?category=react" className="text-primary hover:underline">
              React 글
            </Link>
            {' | '}
            <Link href="/posts?category=javascript" className="text-primary hover:underline">
              JavaScript 글
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 