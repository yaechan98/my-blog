# 블로그 웹사이트 기술 아키텍처

이 문서는 Next.js 15+ 기반 블로그 웹사이트의 기술적 구현 방향과 아키텍처를 설명합니다. 초보자도 이해할 수 있는 수준의 구현을 목표로 하며, 확장성과 유지보수성을 고려한 설계 원칙을 제시합니다.

## 목차

1. [프로젝트 구조 및 파일 조직](#1-프로젝트-구조-및-파일-조직)
2. [컴포넌트 계층 구조](#2-컴포넌트-계층-구조)
3. [데이터 모델 및 상태 관리 전략](#3-데이터-모델-및-상태-관리-전략)
4. [라우팅 및 네비게이션](#4-라우팅-및-네비게이션)
5. [성능 최적화 전략](#5-성능-최적화-전략)
6. [구현 단계별 가이드라인](#6-구현-단계별-가이드라인)
7. [확장성 고려사항](#7-확장성-고려사항)

---

## 1. 프로젝트 구조 및 파일 조직

### 1.1 폴더 구조와 네이밍 규칙

기본 폴더 구조는 `docs/structure.md` 문서에 정의된 구조를 따르되, 아래와 같은 원칙을 적용합니다:

```
my_blog/
├── app/                          # Next.js App Router 루트 디렉토리
│   ├── (blog)/                   # 블로그 관련 라우트 그룹
│   │   ├── posts/                # 포스트 목록 페이지
│   │   │   ├── [slug]/           # 포스트 상세 페이지
│   │   │   └── page.tsx
│   │   ├── categories/           # 카테고리 페이지
│   │   └── search/               # 검색 페이지
│   ├── about/                    # 소개 페이지
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 홈페이지
├── components/                   # 컴포넌트 디렉토리
│   ├── blog/                     # 블로그 관련 컴포넌트
│   ├── common/                   # 공통 컴포넌트
│   └── ui/                       # UI 컴포넌트 (ShadCN)
├── config/                       # 설정 파일
├── data/                         # 목업 데이터
├── hooks/                        # 커스텀 훅
├── lib/                          # 유틸리티 함수
├── public/                       # 정적 파일
├── types/                        # 타입 정의
└── ...
```

**네이밍 규칙:**

1. **폴더명**: kebab-case 사용 (예: `blog-posts`)
2. **파일명**:
   - 컴포넌트: PascalCase (예: `PostCard.tsx`)
   - 유틸리티/훅: camelCase (예: `useSearch.ts`)
   - 타입 정의: PascalCase (예: `PostType.ts`)
3. **라우트 파일**:
   - Next.js 규칙에 따라 `page.tsx`, `layout.tsx`, `loading.tsx` 등의 특수 파일명 사용
4. **컴포넌트 내부 함수**:
   - 컴포넌트 함수: PascalCase (예: `function PostCard()`)
   - 이벤트 핸들러: handle + 이벤트명 (예: `handleClick`, `handleSubmit`)

### 1.2 파일 분리 및 모듈화 전략

**컴포넌트 분리 원칙:**

1. **단일 책임 원칙**: 각 컴포넌트는 하나의 책임만 가집니다.
2. **재사용성 기준**: 두 번 이상 사용되는 UI 요소는 별도 컴포넌트로 분리합니다.
3. **복잡성 기준**: 150줄 이상의 컴포넌트는 작은 컴포넌트로 분리를 고려합니다.
4. **컨텍스트 분리**: 데이터 로직과 UI 렌더링 로직을 분리합니다.

**모듈화 패턴:**

```typescript
// 1. 외부 라이브러리 임포트
import { useState } from 'react';
import Image from 'next/image';

// 2. 내부 컴포넌트 임포트
import { Button } from '@/components/ui/button';

// 3. 타입 정의
interface PostCardProps {
  title: string;
  excerpt: string;
  // ...
}

// 4. 유틸리티 함수 (컴포넌트 내에서만 사용될 경우)
function formatDate(date: string): string {
  // ...
}

// 5. 컴포넌트 정의
export function PostCard({ title, excerpt }: PostCardProps) {
  // ...
}
```

**인덱스 파일 활용:**

컴포넌트 그룹화 및 깔끔한 임포트를 위해 `index.ts` 파일을 사용합니다:

```typescript
// components/blog/index.ts
export * from './PostCard';
export * from './PostContent';
export * from './CommentSection';
```

이렇게 하면 다음과 같이 임포트할 수 있습니다:

```typescript
import { PostCard, PostContent, CommentSection } from '@/components/blog';
```

### 1.3 설정 파일 관리 방안

**환경 변수:**

- `.env`: 기본 환경 변수
- `.env.local`: 로컬 환경 변수 (git 무시)
- `.env.development`: 개발 환경 변수
- `.env.production`: 프로덕션 환경 변수

**설정 파일:**

중앙 집중식 설정을 위해 `config` 폴더를 활용합니다:

```typescript
// config/site.ts
export const siteConfig = {
  title: '개발 블로그',
  description: '웹 개발 학습 블로그',
  url: 'https://example.com',
  ogImage: 'https://example.com/og.jpg',
  links: {
    github: 'https://github.com/username',
    twitter: 'https://twitter.com/username',
  }
}
```

```typescript
// config/nav.ts
export const navItems = [
  { title: '홈', href: '/' },
  { title: '블로그', href: '/posts' },
  { title: '카테고리', href: '/categories' },
  { title: '소개', href: '/about' },
]
```

사용 예시:

```typescript
import { siteConfig } from '@/config/site';

export function Metadata() {
  return (
    <title>{siteConfig.title}</title>
    // ...
  )
}
```

## 2. 컴포넌트 계층 구조

### 2.1 Layout 컴포넌트 설계

Next.js App Router의 레이아웃 시스템을 활용하여 중첩된 레이아웃 구조를 구현합니다:

```
app/
├── layout.tsx        # 루트 레이아웃 (전체 페이지 공통)
├── (blog)/
│   ├── layout.tsx    # 블로그 섹션 레이아웃
│   └── posts/
│       ├── layout.tsx # 포스트 목록 레이아웃
│       └── [slug]/
│           └── layout.tsx # 포스트 상세 레이아웃
```

**루트 레이아웃 (app/layout.tsx):**

```tsx
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**블로그 레이아웃 (app/(blog)/layout.tsx):**

```tsx
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-8 md:py-12">
      {children}
    </div>
  );
}
```

**포스트 상세 레이아웃 (app/(blog)/posts/[slug]/layout.tsx):**

```tsx
import { TableOfContents } from '@/components/blog/TableOfContents';

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
      <article>{children}</article>
      <aside className="hidden lg:block">
        <TableOfContents />
      </aside>
    </div>
  );
}
```

### 2.2 재사용 가능한 UI 컴포넌트

ShadCN UI 컴포넌트 라이브러리를 기반으로 하되, 블로그에 특화된 컴포넌트를 추가로 구현합니다:

**1. 기본 UI 컴포넌트 (ShadCN):**
- Button, Card, Input 등 기본 UI 요소

**2. 공통 컴포넌트:**
- Header, Footer, Navigation 등 레이아웃 컴포넌트

**3. 블로그 특화 컴포넌트:**
- PostCard: 포스트 미리보기 카드
- CommentSection: 댓글 섹션
- CategoryList: 카테고리 목록

**예시: PostCard 컴포넌트**

```tsx
// components/blog/PostCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { PostType } from '@/types/post';

interface PostCardProps {
  post: PostType;
  variant?: 'default' | 'compact';
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        {variant === 'default' && (
          <div className="aspect-video w-full overflow-hidden">
            <Image
              src={post.coverImage || '/images/placeholder.jpg'}
              alt={post.title}
              width={600}
              height={340}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{formatDate(post.date)}</span>
            <span className="mx-2">·</span>
            <span>{post.category}</span>
          </div>
          <h3 className="line-clamp-2 text-xl font-semibold">{post.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          {post.readingTime} 분 읽기
        </CardFooter>
      </Card>
    </Link>
  );
}
```

### 2.3 페이지별 컴포넌트 구조

각 페이지 타입별로 다음과 같은 컴포넌트 구조를 가집니다:

**1. 홈페이지 (app/page.tsx):**
```
HomePage
├── HeroSection
├── FeaturedPostsSection
│   └── PostCard (여러 개)
├── CategorySection
│   └── CategoryCard (여러 개)
└── NewsletterSection
```

**2. 포스트 목록 페이지 (app/(blog)/posts/page.tsx):**
```
PostsPage
├── PageHeader
├── FilterSection
│   ├── CategoryFilter
│   └── SortOptions
└── PostGrid
    └── PostCard (여러 개)
```

**3. 포스트 상세 페이지 (app/(blog)/posts/[slug]/page.tsx):**
```
PostPage
├── PostHeader
│   ├── PostTitle
│   └── PostMeta
├── PostContent
├── TagList
├── AuthorSection
├── ShareButtons
├── RelatedPosts
│   └── PostCard (여러 개)
└── CommentSection
    ├── CommentList
    │   └── CommentItem (여러 개)
    └── CommentForm
```

### 2.4 Props 전달 및 상태 관리 패턴

**Props 전달 패턴:**

1. **Props 구조분해 할당:**
   ```tsx
   function PostCard({ title, excerpt, date }: PostCardProps) {
     // ...
   }
   ```

2. **객체 프로퍼티 전달:**
   ```tsx
   <PostCard post={post} />
   ```

3. **선택적 Props와 기본값:**
   ```tsx
   function Button({ 
     variant = 'default', 
     size = 'md',
     children 
   }: ButtonProps) {
     // ...
   }
   ```

**상태 관리 패턴:**

1. **지역 상태 (useState):**
   ```tsx
   function CommentForm() {
     const [comment, setComment] = useState('');
     const [isSubmitting, setIsSubmitting] = useState(false);
     
     const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       setIsSubmitting(true);
       // 제출 로직...
       setIsSubmitting(false);
     };
     
     return (
       <form onSubmit={handleSubmit}>
         <textarea 
           value={comment} 
           onChange={(e) => setComment(e.target.value)}
         />
         <button disabled={isSubmitting}>
           {isSubmitting ? '제출 중...' : '댓글 작성'}
         </button>
       </form>
     );
   }
   ```

2. **컨텍스트를 통한 상태 공유 (useContext):**
   ```tsx
   // contexts/ThemeContext.tsx
   const ThemeContext = createContext<{
     theme: 'light' | 'dark';
     toggleTheme: () => void;
   }>({
     theme: 'light',
     toggleTheme: () => {},
   });
   
   export function ThemeProvider({ children }: { children: React.ReactNode }) {
     const [theme, setTheme] = useState<'light' | 'dark'>('light');
     
     const toggleTheme = () => {
       setTheme(theme === 'light' ? 'dark' : 'light');
     };
     
     return (
       <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
       </ThemeContext.Provider>
     );
   }
   
   export function useTheme() {
     return useContext(ThemeContext);
   }
   ```

3. **사용자 인터랙션 상태 관리:**
   ```tsx
   function PostLikeButton({ postId }: { postId: string }) {
     const [liked, setLiked] = useState(false);
     const [likeCount, setLikeCount] = useState(0);
     
     useEffect(() => {
       // 초기 좋아요 상태 로드
       const hasLiked = localStorage.getItem(`post-${postId}-liked`) === 'true';
       setLiked(hasLiked);
       
       // 초기 좋아요 수 로드
       const count = parseInt(localStorage.getItem(`post-${postId}-likes`) || '0');
       setLikeCount(count);
     }, [postId]);
     
     const handleLike = () => {
       const newLiked = !liked;
       setLiked(newLiked);
       setLikeCount(prevCount => newLiked ? prevCount + 1 : prevCount - 1);
       
       // 로컬 스토리지에 상태 저장
       localStorage.setItem(`post-${postId}-liked`, String(newLiked));
       localStorage.setItem(`post-${postId}-likes`, String(newLiked ? likeCount + 1 : likeCount - 1));
     };
     
     return (
       <button onClick={handleLike}>
         {liked ? '좋아요 취소' : '좋아요'} ({likeCount})
       </button>
     );
   }
   ```

## 3. 데이터 모델 및 상태 관리 전략

### 3.1 블로그 포스트 데이터 구조

블로그 포스트는 다음과 같은 타입 구조를 가집니다:

```typescript
// types/post.ts
export interface PostType {
  slug: string;            // URL 식별자 (고유)
  title: string;           // 포스트 제목
  date: string;            // 작성일 (ISO 형식)
  modifiedDate?: string;   // 수정일 (선택 사항)
  author: AuthorType;      // 작성자 정보
  excerpt: string;         // 요약
  content: string;         // 본문 내용 (Markdown/MDX)
  coverImage?: string;     // 커버 이미지 경로
  tags: string[];          // 태그 목록
  category: string;        // 카테고리
  readingTime: number;     // 읽기 예상 시간 (분)
  featured?: boolean;      // 특집 포스트 여부
  draft?: boolean;         // 초안 여부
}

export interface AuthorType {
  name: string;            // 이름
  image?: string;          // 프로필 이미지
  bio?: string;            // 간단한 소개
}
```

### 3.2 카테고리 및 태그 모델

카테고리와 태그는 다음과 같은 구조를 가집니다:

```typescript
// types/taxonomy.ts
export interface CategoryType {
  slug: string;            // URL 식별자
  name: string;            // 카테고리 이름
  description?: string;    // 카테고리 설명
  parentSlug?: string;     // 부모 카테고리 (있는 경우)
  featured?: boolean;      // 특집 카테고리 여부
}

export interface TagType {
  slug: string;            // URL 식별자
  name: string;            // 태그 이름
  postCount?: number;      // 해당 태그가 사용된 포스트 수
}
```

### 3.3 클라이언트 상태 관리

**1. 로컬 상태 관리 (useState):**

```tsx
function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      // 목업 데이터에서 검색
      const filtered = mockPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } catch (error) {
      console.error('검색 오류:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch} disabled={isSearching}>
        {isSearching ? '검색 중...' : '검색'}
      </button>
      
      {results.length > 0 && (
        <ul>
          {results.map(post => (
            <li key={post.slug}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

**2. 사이드 이펙트 관리 (useEffect):**

```tsx
function PostView({ slug }: { slug: string }) {
  const [post, setPost] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function loadPost() {
      setIsLoading(true);
      try {
        // 목업 데이터에서 포스트 찾기
        const foundPost = mockPosts.find(p => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
          
          // 조회수 증가 (로컬 스토리지)
          const viewCount = parseInt(localStorage.getItem(`post-${slug}-views`) || '0');
          localStorage.setItem(`post-${slug}-views`, String(viewCount + 1));
        } else {
          throw new Error('포스트를 찾을 수 없습니다');
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPost();
  }, [slug]);
  
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error.message}</div>;
  if (!post) return <div>포스트를 찾을 수 없습니다</div>;
  
  return (
    <article>
      <h1>{post.title}</h1>
      {/* 포스트 내용 */}
    </article>
  );
}
```

**3. 커스텀 훅을 통한 상태 관리 로직 추상화:**

```tsx
// hooks/usePosts.ts
export function usePosts(category?: string) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      try {
        // 목업 데이터 사용
        let filteredPosts = [...mockPosts];
        
        // 카테고리 필터링
        if (category) {
          filteredPosts = filteredPosts.filter(post => post.category === category);
        }
        
        // 최신순 정렬
        filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setPosts(filteredPosts);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPosts();
  }, [category]);
  
  return { posts, isLoading, error };
}
```

### 3.4 목업 데이터 구조 및 관리

초기 개발 단계에서는 실제 데이터베이스 연동 대신 목업 데이터를 사용합니다:

```typescript
// data/posts.ts
import { PostType } from '@/types/post';

export const posts: PostType[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Next.js 시작하기',
    date: '2025-05-01',
    author: {
      name: '홍길동',
      image: '/images/authors/hong.jpg',
      bio: '프론트엔드 개발자'
    },
    excerpt: 'Next.js를 이용한 웹 개발의 기초를 알아봅니다.',
    content: '# Next.js 시작하기\n\nNext.js는 React 기반의 풀스택 웹 프레임워크입니다...',
    coverImage: '/images/posts/nextjs-cover.jpg',
    tags: ['next.js', 'react', '웹개발'],
    category: '프론트엔드',
    readingTime: 5
  },
  // 더 많은 목업 데이터...
]
```

```typescript
// data/categories.ts
import { CategoryType } from '@/types/taxonomy';

export const categories: CategoryType[] = [
  {
    slug: 'frontend',
    name: '프론트엔드',
    description: '프론트엔드 개발에 관한 글'
  },
  {
    slug: 'backend',
    name: '백엔드',
    description: '백엔드 개발에 관한 글'
  },
  // 더 많은 카테고리...
]
```

```typescript
// data/tags.ts
import { TagType } from '@/types/taxonomy';

export const tags: TagType[] = [
  {
    slug: 'react',
    name: 'React',
    postCount: 5
  },
  {
    slug: 'next-js',
    name: 'Next.js',
    postCount: 3
  },
  // 더 많은 태그...
]
```

**목업 데이터 관리 패턴:**

1. `data/` 폴더에 각 엔티티별 파일 분리
2. 타입 시스템을 통한 데이터 무결성 검증
3. 향후 실제 API로 전환 시 인터페이스는 유지

## 4. 라우팅 및 네비게이션

### 4.1 App Router 활용 전략

Next.js 15+의 App Router는 파일 시스템 기반 라우팅을 제공합니다:

```
app/
├── page.tsx             # / (홈 페이지)
├── (blog)/
│   ├── posts/
│   │   ├── page.tsx     # /posts (포스트 목록)
│   │   └── [slug]/
│   │       └── page.tsx # /posts/[slug] (포스트 상세)
│   └── categories/
│       ├── page.tsx     # /categories (카테고리 목록)
│       └── [slug]/
│           └── page.tsx # /categories/[slug] (카테고리별 포스트)
└── about/
    └── page.tsx         # /about (소개 페이지)
```

**라우트 그룹 활용:**

라우트 그룹을 사용하여 URL 구조에 영향을 주지 않으면서 코드를 논리적으로 구성합니다:

```
app/
├── (marketing)/         # URL에 (marketing)이 포함되지 않음
│   ├── page.tsx         # / (홈 페이지)
│   └── about/
│       └── page.tsx     # /about (소개 페이지)
└── (blog)/              # URL에 (blog)가 포함되지 않음
    ├── posts/
    │   └── page.tsx     # /posts (포스트 목록)
    └── categories/
        └── page.tsx     # /categories (카테고리 목록)
```

### 4.2 동적 라우팅 구현 방안

**1. 동적 라우트 세그먼트:**

```tsx
// app/(blog)/posts/[slug]/page.tsx
export default function PostPage({ params }: { params: { slug: string } }) {
  // params.slug로 포스트 ID 접근
  return <PostView slug={params.slug} />;
}
```

**2. generateStaticParams 활용 (정적 생성):**

```tsx
// app/(blog)/posts/[slug]/page.tsx
import { posts } from '@/data/posts';

// 빌드 시점에 모든 포스트 경로 생성
export async function generateStaticParams() {
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  return <PostView slug={params.slug} />;
}
```

**3. notFound 활용:**

```tsx
// app/(blog)/posts/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { posts } from '@/data/posts';

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug);
  
  // 포스트가 없으면 404 페이지 표시
  if (!post) {
    notFound();
  }
  
  return <PostView post={post} />;
}
```

### 4.3 SEO 최적화를 위한 메타데이터 설정

**1. 정적 메타데이터:**

```tsx
// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '개발 블로그',
    template: '%s | 개발 블로그',
  },
  description: '웹 개발 학습을 위한 기술 블로그',
  keywords: ['웹개발', 'Next.js', 'React', '프론트엔드', '블로그'],
  authors: [{ name: '홍길동' }],
  creator: '홍길동',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://example.com',
    title: '개발 블로그',
    description: '웹 개발 학습을 위한 기술 블로그',
    siteName: '개발 블로그',
  },
  twitter: {
    card: 'summary_large_image',
    title: '개발 블로그',
    description: '웹 개발 학습을 위한 기술 블로그',
    creator: '@username',
  },
  icons: {
    icon: '/favicon.ico',
  },
};
```

**2. 동적 메타데이터:**

```tsx
// app/(blog)/posts/[slug]/page.tsx
import { Metadata } from 'next';
import { posts } from '@/data/posts';

// 동적 메타데이터 생성
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = posts.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage || '/images/default-og.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || '/images/default-og.jpg'],
    },
  };
}
```

## 5. 성능 최적화 전략

### 5.1 Next.js Image 컴포넌트 활용

이미지 최적화를 위해 Next.js의 내장 `Image` 컴포넌트를 활용합니다:

```tsx
import Image from 'next/image';

export function OptimizedImage({ src, alt, priority = false }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}
```

**성능 최적화 포인트:**

1. **자동 이미지 최적화**: WebP와 AVIF 같은 최신 포맷 제공
2. **지연 로딩**: 기본적으로 뷰포트에 들어올 때만 로드
3. **이미지 크기 조정**: 다양한 디바이스에 맞게 자동 조정
4. **priority 속성**: LCP(Largest Contentful Paint) 개선을 위해 중요 이미지에 적용

### 5.2 코드 스플리팅 기본 적용

Next.js는 페이지 단위로 자동 코드 스플리팅을 제공하지만, 추가적인 최적화가 필요합니다:

**1. 동적 임포트 활용:**

```tsx
import dynamic from 'next/dynamic';

// 필요할 때만 로드되는 무거운 컴포넌트
const DynamicCommentSection = dynamic(
  () => import('@/components/blog/CommentSection'),
  {
    loading: () => <p>댓글을 불러오는 중...</p>,
    ssr: false, // 클라이언트 측에서만 렌더링
  }
);

export function PostView({ post }: { post: PostType }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{/* 포스트 내용 */}</div>
      
      {/* 스크롤 다운 시 로드 */}
      <DynamicCommentSection postId={post.slug} />
    </article>
  );
}
```

**2. 조건부 임포트:**

```tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// 필요시에만 로드
const CodeEditor = dynamic(() => import('@/components/CodeEditor'), {
  ssr: false,
  loading: () => <div>에디터 로딩 중...</div>,
});

export function InteractiveCode({ initialCode }: { initialCode: string }) {
  const [showEditor, setShowEditor] = useState(false);
  
  return (
    <div>
      <pre>{initialCode}</pre>
      <button onClick={() => setShowEditor(true)}>
        코드 편집하기
      </button>
      
      {showEditor && <CodeEditor code={initialCode} />}
    </div>
  );
}
```

### 5.3 기본적인 캐싱 전략

Next.js App Router는 기본적으로 데이터 캐싱 기능을 제공합니다:

**1. 서버 컴포넌트에서 데이터 가져오기 (캐싱 적용):**

```tsx
// app/(blog)/posts/page.tsx
import { getPosts } from '@/lib/api/posts';

// 캐싱 옵션 설정
export const revalidate = 3600; // 1시간마다 갱신

export default async function PostsPage() {
  // 데이터는 revalidate 시간 동안 캐싱됨
  const posts = await getPosts();
  
  return (
    <div>
      <h1>모든 포스트</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
```

**2. 클라이언트 측 상태 캐싱:**

```tsx
'use client';

import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // 상태 초기화
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // 상태 변경 시 로컬 스토리지 업데이트
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue] as const;
}

// 사용 예시
function ReadingHistory() {
  const [history, setHistory] = useLocalStorage<string[]>('reading-history', []);
  
  function addToHistory(slug: string) {
    setHistory(prev => {
      if (prev.includes(slug)) {
        return prev;
      }
      return [slug, ...prev].slice(0, 10); // 최대 10개만 유지
    });
  }
  
  return { history, addToHistory };
}
```

**3. 클라이언트 측 데이터 캐싱:**

```tsx
'use client';

import { useState, useEffect } from 'react';
import { posts } from '@/data/posts';
import { PostType } from '@/types/post';

export function useCachedPosts(category?: string) {
  const cacheKey = `posts-${category || 'all'}`;
  const [cachedPosts, setCachedPosts] = useState<PostType[]>([]);
  
  useEffect(() => {
    // 캐시에서 먼저 확인
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setCachedPosts(JSON.parse(cached));
      return;
    }
    
    // 캐시가 없으면 데이터 가져오기
    let filteredPosts = [...posts];
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }
    
    // 결과 캐싱
    setCachedPosts(filteredPosts);
    sessionStorage.setItem(cacheKey, JSON.stringify(filteredPosts));
  }, [category, cacheKey]);
  
  return cachedPosts;
}
```

## 6. 구현 단계별 가이드라인

### 6.1 초기 설정 단계

1. **프로젝트 폴더 구조 설정**
   - `app/`, `components/`, `lib/` 등 기본 폴더 생성
   - 타입 정의 파일 작성 (`types/`)

2. **기본 컴포넌트 구현**
   - 레이아웃 컴포넌트 (Header, Footer)
   - 테마 제공자 설정

3. **목업 데이터 준비**
   - 포스트, 카테고리, 태그 데이터 작성
   - 테스트용 이미지 준비

### 6.2 코어 기능 구현 단계

1. **홈페이지 구현**
   - Hero 섹션
   - 최신 포스트 목록
   - 카테고리 네비게이션

2. **포스트 목록 페이지 구현**
   - 포스트 그리드 레이아웃
   - 필터링 및 정렬 기능
   - 페이지네이션

3. **포스트 상세 페이지 구현**
   - 포스트 콘텐츠 렌더링
   - 댓글 시스템
   - 관련 포스트 추천

4. **검색 기능 구현**
   - 검색 폼
   - 결과 표시 UI
   - 필터링 옵션

### 6.3 확장 기능 구현 단계

1. **사용자 인터랙션 기능**
   - 좋아요 및 북마크
   - 댓글 작성 및 답글
   - 최근 읽은 포스트 기록

2. **UI 개선**
   - 다크 모드 지원
   - 반응형 디자인 개선
   - 접근성 향상

3. **성능 최적화**
   - 이미지 최적화
   - 코드 스플리팅 개선
   - 로딩 상태 개선

## 7. 확장성 고려사항

### 7.1 데이터베이스 연동

현재는 목업 데이터를 사용하지만, 향후 실제 데이터베이스로 전환 시 고려사항:

1. **데이터 액세스 레이어 추상화**
   - `lib/api/` 폴더에 데이터 액세스 함수 구현
   - 인터페이스는 유지하되 내부 구현만 변경

```typescript
// lib/api/posts.ts
export async function getPosts(): Promise<PostType[]> {
  // 현재: 목업 데이터 반환
  return posts;
  
  // 향후: 실제 DB 쿼리로 변경
  // const response = await fetch('/api/posts');
  // return response.json();
}
```

2. **API 라우트 구현**
   - `app/api/` 폴더에 API 엔드포인트 구현
   - REST 또는 GraphQL 기반 API 설계

### 7.2 사용자 인증 및 권한 관리

블로그에 사용자 기능 추가 시 고려사항:

1. **인증 시스템 통합**
   - NextAuth.js 또는 직접 구현한 인증 시스템
   - 사용자 프로필 및 권한 관리

2. **권한 기반 UI 조건부 렌더링**
   - 관리자/작성자/일반 사용자별 UI 분기
   - 인증 상태에 따른 기능 제한

### 7.3 고급 콘텐츠 관리

더 복잡한 콘텐츠 관리 요구사항 대응:

1. **MDX 지원 강화**
   - 커스텀 MDX 컴포넌트
   - 코드 하이라이팅
   - 인터랙티브 요소

2. **관리자 대시보드**
   - 콘텐츠 작성 및 편집 인터페이스
   - 통계 및 분석 기능

3. **미디어 라이브러리**
   - 이미지 및 파일 업로드 관리
   - 최적화 및 크기 조정 자동화

## 결론

이 기술 아키텍처는 Next.js 15+, TypeScript, TailwindCSS를 활용한 블로그 웹사이트 개발의 기반을 제공합니다. 초보자도 이해하기 쉬운 수준으로 설계되었으며, 확장성과 유지보수성을 고려했습니다.

주요 구현 원칙:
1. **명확한 책임 분리**: 컴포넌트, 데이터, 유틸리티 분리
2. **타입 안전성**: TypeScript를 통한 타입 정의
3. **성능 고려**: Next.js의 최적화 기능 활용
4. **확장 가능한 구조**: 향후 기능 추가를 고려한 설계

이 아키텍처를 바탕으로 단계적으로 구현하면 안정적이고 확장 가능한 블로그 웹사이트를 구축할 수 있습니다.
