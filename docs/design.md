# 블로그 웹사이트 디자인 가이드

## 1. 디자인 컨셉 및 원칙

### 1.1 디자인 철학

이 블로그는 웹 개발 학습자를 위한 기술 블로그로서, 다음과 같은 디자인 철학을 지향합니다:

- **콘텐츠 중심성**: 읽기 쉽고 콘텐츠에 집중할 수 있는 디자인
- **명확성**: 복잡한 기술 개념을 시각적으로 명확하게 전달
- **접근성**: 모든 사용자가 콘텐츠에 쉽게 접근할 수 있는 디자인
- **일관성**: 전체 웹사이트에서 일관된 시각적 언어 유지
- **기능성**: 미니멀하면서도 필요한 모든 기능을 제공하는 균형

### 1.2 디자인 원칙

1. **간결함 (Simplicity)**
   - 불필요한 장식 요소 최소화
   - 화면당 핵심 정보에 집중

2. **계층 구조 (Hierarchy)**
   - 중요한 정보를 시각적으로 강조
   - 명확한 정보 구조 제공

3. **일관성 (Consistency)**
   - 동일한 요소는 동일한 방식으로 표현
   - 사용자가 예측 가능한 인터페이스 제공

4. **여백 활용 (White Space)**
   - 충분한 여백으로 가독성 향상
   - 콘텐츠 그룹 간 구분 명확화

5. **반응형 고려 (Responsiveness)**
   - 모든 화면 크기에서 최적의 경험 제공
   - 기기 특성에 맞는 상호작용 디자인

## 2. 색상 팔레트 및 타이포그래피

### 2.1 색상 팔레트

TailwindCSS의 색상 시스템을 기반으로 하되, 일부 커스텀 색상을 추가하여 블로그의 브랜드 아이덴티티를 구축합니다.

#### 2.1.1 주 색상 (Primary Colors)

브랜드 아이덴티티를 나타내는 주 색상입니다.

```css
--primary-50: #eef2ff;  /* Tailwind indigo-50 */
--primary-100: #e0e7ff; /* Tailwind indigo-100 */
--primary-200: #c7d2fe; /* Tailwind indigo-200 */
--primary-300: #a5b4fc; /* Tailwind indigo-300 */
--primary-400: #818cf8; /* Tailwind indigo-400 */
--primary-500: #6366f1; /* Tailwind indigo-500 - 메인 브랜드 컬러 */
--primary-600: #4f46e5; /* Tailwind indigo-600 */
--primary-700: #4338ca; /* Tailwind indigo-700 */
--primary-800: #3730a3; /* Tailwind indigo-800 */
--primary-900: #312e81; /* Tailwind indigo-900 */
--primary-950: #1e1b4b; /* Tailwind indigo-950 */
```

#### 2.1.2 보조 색상 (Accent Colors)

강조와 포인트를 주기 위한 보조 색상입니다.

```css
--accent-500: #ec4899; /* Tailwind pink-500 */
--accent-600: #db2777; /* Tailwind pink-600 */
--accent-700: #be185d; /* Tailwind pink-700 */
```

#### 2.1.3 상태 색상 (State Colors)

사용자 피드백과 상태를 나타내는 색상입니다.

```css
--success-500: #22c55e; /* Tailwind green-500 */
--warning-500: #f59e0b; /* Tailwind amber-500 */
--error-500: #ef4444;   /* Tailwind red-500 */
--info-500: #3b82f6;    /* Tailwind blue-500 */
```

#### 2.1.4 중성 색상 (Neutral Colors)

텍스트, 배경, 구분선 등에 사용되는 중성 색상입니다.

```css
--neutral-50: #fafafa;  /* Tailwind neutral-50 */
--neutral-100: #f5f5f5; /* Tailwind neutral-100 */
--neutral-200: #e5e5e5; /* Tailwind neutral-200 */
--neutral-300: #d4d4d4; /* Tailwind neutral-300 */
--neutral-400: #a3a3a3; /* Tailwind neutral-400 */
--neutral-500: #737373; /* Tailwind neutral-500 */
--neutral-600: #525252; /* Tailwind neutral-600 */
--neutral-700: #404040; /* Tailwind neutral-700 */
--neutral-800: #262626; /* Tailwind neutral-800 */
--neutral-900: #171717; /* Tailwind neutral-900 */
--neutral-950: #0a0a0a; /* Tailwind neutral-950 */
```

#### 2.1.5 다크 모드 색상

다크 모드에서는 위의 색상들이 적절히 반전되어 사용됩니다. TailwindCSS의 다크 모드 기능을 활용합니다.

### 2.2 타이포그래피

#### 2.2.1 폰트 패밀리

```css
/* 기본 폰트 - Geist Sans */
--font-sans: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* 모노스페이스 폰트 - 코드 블록용 */
--font-mono: 'Geist Mono', 'SF Mono', 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
```

#### 2.2.2 폰트 크기

TailwindCSS의 기본 폰트 크기 체계를 따르되, 블로그 콘텐츠의 가독성을 위해 일부 조정합니다.

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px - 기본 본문 */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

#### 2.2.3 폰트 두께

```css
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-normal: 400;    /* 기본 본문 */
--font-medium: 500;    /* 중요 텍스트 */
--font-semibold: 600;  /* 부제목 */
--font-bold: 700;      /* 제목 */
--font-extrabold: 800;
--font-black: 900;
```

#### 2.2.4 라인 높이

```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;   /* 기본 본문 */
--leading-relaxed: 1.625; /* 긴 텍스트 */
--leading-loose: 2;
```

#### 2.2.5 텍스트 스타일 가이드

| 요소            | 폰트 크기      | 폰트 두께     | 색상                 | TailwindCSS 클래스                                          |
|----------------|---------------|--------------|---------------------|-----------------------------------------------------------|
| 페이지 제목      | text-4xl      | font-bold    | neutral-900/50 (다크 모드) | `text-4xl font-bold text-neutral-900 dark:text-neutral-50`   |
| 섹션 제목       | text-2xl      | font-semibold| neutral-800/100 (다크 모드) | `text-2xl font-semibold text-neutral-800 dark:text-neutral-100` |
| 소제목          | text-xl       | font-medium  | neutral-700/200 (다크 모드) | `text-xl font-medium text-neutral-700 dark:text-neutral-200`   |
| 본문 텍스트      | text-base     | font-normal  | neutral-700/300 (다크 모드) | `text-base text-neutral-700 dark:text-neutral-300`             |
| 작은 텍스트      | text-sm       | font-normal  | neutral-600/400 (다크 모드) | `text-sm text-neutral-600 dark:text-neutral-400`               |
| 코드 (인라인)    | text-sm       | font-normal  | primary-700/300 (다크 모드) | `text-sm font-mono bg-neutral-100 dark:bg-neutral-800 text-primary-700 dark:text-primary-300 px-1.5 py-0.5 rounded` |

## 3. 주요 페이지 레이아웃

### 3.1 페이지 구조

모든 페이지는 다음과 같은 기본 구조를 따릅니다:

```
+------------------------------------------+
|                 헤더                      |
+------------------------------------------+
|                                          |
|              메인 콘텐츠                   |
|                                          |
+------------------------------------------+
|                 푸터                      |
+------------------------------------------+
```

특정 페이지에서는 다음과 같은 확장 구조를 사용할 수 있습니다:

```
+------------------------------------------+
|                 헤더                      |
+------------------------------------------+
|          |                     |         |
|          |                     |         |
| 사이드바  |     메인 콘텐츠     | 보조 바  |
|          |                     |         |
|          |                     |         |
+------------------------------------------+
|                 푸터                      |
+------------------------------------------+
```

### 3.2 헤더 레이아웃

헤더는 모든 페이지 상단에 고정되며, 다음 요소를 포함합니다:

```
+------------------------------------------+
| 로고  |  네비게이션 메뉴  |  검색  | 테마  |
+------------------------------------------+
```

#### TailwindCSS 클래스:

```html
<header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="container flex h-16 items-center justify-between py-4">
    <!-- 로고 -->
    <!-- 네비게이션 -->
    <!-- 검색 버튼 -->
    <!-- 테마 토글 -->
  </div>
</header>
```

### 3.3 메인 콘텐츠 레이아웃

#### 3.3.1 블로그 목록 페이지

그리드 기반 레이아웃으로, 반응형으로 열 수가 조정됩니다:

```html
<main class="container py-8 md:py-12">
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <!-- 포스트 카드 반복 -->
  </div>
</main>
```

#### 3.3.2 블로그 상세 페이지

```html
<main class="container py-8 md:py-12">
  <article class="mx-auto max-w-3xl">
    <!-- 포스트 헤더 -->
    <!-- 포스트 콘텐츠 -->
    <!-- 댓글 섹션 -->
  </article>
</main>
```

#### 3.3.3 사이드바가 있는 레이아웃

```html
<main class="container py-8 md:py-12">
  <div class="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr_200px]">
    <!-- 사이드바 -->
    <!-- 메인 콘텐츠 -->
    <!-- 보조 사이드바 (데스크탑에서만 표시) -->
  </div>
</main>
```

### 3.4 푸터 레이아웃

```html
<footer class="border-t bg-muted py-6 md:py-8">
  <div class="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
    <!-- 카피라이트 -->
    <!-- 푸터 링크 -->
    <!-- 소셜 미디어 링크 -->
  </div>
</footer>
```

## 4. UI 컴포넌트 스타일 가이드

### 4.1 버튼

ShadCN UI의 버튼 컴포넌트를 기반으로 하되, 블로그의 브랜드 색상을 적용합니다.

#### 4.1.1 버튼 종류

| 종류       | 용도                   | TailwindCSS 클래스 (ShadCN 변형) |
|-----------|------------------------|-----------------------------------|
| 기본(Primary) | 주요 작업 (CTA)        | `variant="default"`               |
| 보조(Secondary) | 보조 작업            | `variant="secondary"`             |
| 아웃라인(Outline) | 덜 강조되는 작업     | `variant="outline"`               |
| 고스트(Ghost) | 배경 없는 버튼         | `variant="ghost"`                 |
| 링크(Link) | 텍스트 링크 형태 버튼     | `variant="link"`                  |
| 위험(Destructive) | 삭제 등 위험 작업   | `variant="destructive"`           |

#### 4.1.2 버튼 크기

| 크기       | 용도                 | TailwindCSS 클래스 (ShadCN 변형) |
|-----------|---------------------|-----------------------------------|
| 작은(Small) | 공간 제약 있는 UI 요소 | `size="sm"`                      |
| 기본(Default) | 일반적인 용도        | `size="default"`                 |
| 큰(Large) | 강조가 필요한 주요 CTA | `size="lg"`                      |
| 아이콘(Icon) | 아이콘만 있는 버튼    | `size="icon"`                    |

#### 4.1.3 버튼 상태

| 상태        | 시각적 표현                 | TailwindCSS 클래스            |
|------------|---------------------------|-------------------------------|
| 기본(Normal) | 기본 상태                  | (기본 클래스)                  |
| 호버(Hover) | 약간 어두워짐               | (TailwindCSS에서 자동 처리)     |
| 포커스(Focus) | 포커스 링                  | (TailwindCSS에서 자동 처리)     |
| 비활성(Disabled) | 흐리게 표현, 클릭 불가    | `disabled`                    |
| 로딩(Loading) | 로딩 아이콘 표시           | `isLoading`                   |

### 4.2 카드

블로그 포스트, 카테고리 등을 표시하는 카드 컴포넌트입니다.

#### 4.2.1 블로그 포스트 카드

```html
<div class="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-shadow hover:shadow-md">
  <!-- 썸네일 이미지 -->
  <div class="aspect-video overflow-hidden">
    <img
      src="thumbnail.jpg"
      alt="썸네일"
      class="h-full w-full object-cover transition-transform group-hover:scale-105"
    />
  </div>
  
  <!-- 카드 콘텐츠 -->
  <div class="flex flex-1 flex-col justify-between p-6">
    <!-- 카테고리 -->
    <div class="mb-2">
      <span class="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 dark:bg-primary-800 dark:text-primary-100">
        카테고리명
      </span>
    </div>
    
    <!-- 제목 -->
    <h3 class="mb-2 line-clamp-2 text-xl font-semibold tracking-tight">
      포스트 제목이 들어갑니다
    </h3>
    
    <!-- 요약 -->
    <p class="mb-4 line-clamp-3 text-muted-foreground">
      포스트 내용 요약이 들어갑니다. 일부분만 보여주고 나머지는 생략됩니다.
    </p>
    
    <!-- 메타 정보 -->
    <div class="mt-auto flex items-center justify-between">
      <span class="text-sm text-muted-foreground">
        2023년 5월 24일
      </span>
      <span class="text-sm text-muted-foreground">
        조회수 123
      </span>
    </div>
  </div>
</div>
```

#### 4.2.2 카테고리 카드

```html
<div class="group flex items-center justify-between rounded-lg border bg-background p-4 transition-colors hover:bg-muted/50">
  <div class="flex items-center gap-4">
    <!-- 아이콘 -->
    <div class="rounded-full bg-primary-100 p-2 text-primary-700 dark:bg-primary-800 dark:text-primary-100">
      <svg><!-- 아이콘 --></svg>
    </div>
    
    <!-- 카테고리명 -->
    <div>
      <h3 class="font-medium">카테고리명</h3>
      <p class="text-sm text-muted-foreground">8개의 포스트</p>
    </div>
  </div>
  
  <!-- 화살표 아이콘 -->
  <svg class="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1">
    <!-- 화살표 아이콘 -->
  </svg>
</div>
```

### 4.3 폼 요소

#### 4.3.1 입력 필드

ShadCN UI의 입력 필드를 사용합니다.

```html
<div class="space-y-2">
  <label
    for="email"
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    이메일
  </label>
  <input
    id="email"
    type="email"
    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    placeholder="name@example.com"
  />
</div>
```

#### 4.3.2 검색 필드

```html
<div class="relative">
  <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
    <!-- 검색 아이콘 -->
  </svg>
  <input
    type="search"
    placeholder="검색어를 입력하세요..."
    class="w-full rounded-full border-none bg-muted py-2 pl-10 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
  />
</div>
```

### 4.4 네비게이션

#### 4.4.1 메인 네비게이션

ShadCN UI의 Navigation Menu 컴포넌트를 사용합니다.

```html
<nav class="hidden md:flex gap-6">
  <a href="/" class="text-sm font-medium text-foreground transition-colors hover:text-primary-500">
    홈
  </a>
  <a href="/posts" class="text-sm font-medium transition-colors hover:text-primary-500 text-muted-foreground">
    블로그
  </a>
  <a href="/categories" class="text-sm font-medium transition-colors hover:text-primary-500 text-muted-foreground">
    카테고리
  </a>
  <a href="/about" class="text-sm font-medium transition-colors hover:text-primary-500 text-muted-foreground">
    소개
  </a>
</nav>
```

#### 4.4.2 모바일 네비게이션

ShadCN UI의 Sheet 컴포넌트를 사용하여 모바일 메뉴를 구현합니다.

```html
<button class="md:hidden" aria-label="메뉴 열기">
  <svg><!-- 햄버거 아이콘 --></svg>
</button>

<!-- 모바일 메뉴 시트 -->
<div class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
  <div class="fixed inset-y-0 right-0 w-[300px] bg-background p-6 shadow-lg">
    <!-- 닫기 버튼 -->
    <button class="absolute right-4 top-4" aria-label="메뉴 닫기">
      <svg><!-- X 아이콘 --></svg>
    </button>
    
    <!-- 모바일 메뉴 항목 -->
    <nav class="mt-8 flex flex-col gap-6">
      <a href="/" class="text-lg font-medium">홈</a>
      <a href="/posts" class="text-lg font-medium text-muted-foreground">블로그</a>
      <a href="/categories" class="text-lg font-medium text-muted-foreground">카테고리</a>
      <a href="/about" class="text-lg font-medium text-muted-foreground">소개</a>
    </nav>
  </div>
</div>
```

## 5. 반응형 디자인 지침

### 5.1 브레이크포인트

TailwindCSS의 기본 브레이크포인트를 사용합니다:

```
sm: 640px  - 모바일 (가로모드)
md: 768px  - 태블릿
lg: 1024px - 노트북
xl: 1280px - 데스크탑
2xl: 1536px - 대형 디스플레이
```

### 5.2 레이아웃 변화 규칙

#### 5.2.1 모바일 (< 640px)

- 단일 컬럼 레이아웃
- 햄버거 메뉴 사용
- 블로그 포스트 카드는 전체 너비로 표시
- 사이드바는 표시되지 않거나 상단에 표시

#### 5.2.2 태블릿 (640px - 1023px)

- 블로그 포스트 카드는 2열 그리드
- 네비게이션 메뉴 표시 (햄버거 메뉴 없음)
- 사이드바는 선택적으로 표시 (콘텐츠 우선)

#### 5.2.3 데스크탑 (≥ 1024px)

- 블로그 포스트 카드는 3열 그리드
- 전체 네비게이션 메뉴 표시
- 사이드바와 본문의 2열 또는 3열 레이아웃

### 5.3 모바일 우선 접근법

- 기본 스타일은 모바일용으로 작성
- 미디어 쿼리를 사용하여 더 큰 화면에 대한 스타일 추가
- TailwindCSS 반응형 접두사 사용 (`sm:`, `md:`, `lg:`, `xl:`)

```html
<!-- 예시: 반응형 그리드 -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 카드 컴포넌트 -->
</div>
```

## 6. TailwindCSS 및 ShadCN UI 활용

### 6.1 TailwindCSS 커스터마이징

`tailwind.config.ts` 파일에서 다음과 같이 테마를 확장합니다:

```typescript
import type { Config } from "tailwindcss";
import { shadcnPlugin } from "./lib/shadcn-plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            '[class~="lead"]': {
              color: 'var(--tw-prose-lead)',
            },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            strong: {
              color: 'var(--tw-prose-bold)',
              fontWeight: '600',
            },
            'ul > li::marker': {
              color: 'var(--tw-prose-bullets)',
            },
            hr: {
              borderColor: 'var(--tw-prose-hr)',
              borderTopWidth: 1,
            },
            blockquote: {
              color: 'var(--tw-prose-quotes)',
              borderLeftWidth: '4px',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              paddingLeft: '1.5em',
            },
            h1: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '800',
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8888889em',
              lineHeight: '1.1111111',
            },
            h2: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
              fontSize: '1.5em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3333333',
            },
            h3: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              lineHeight: '1.6',
            },
            h4: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              lineHeight: '1.5',
            },
            code: {
              color: 'var(--tw-prose-code)',
              fontWeight: '600',
              fontSize: '0.875em',
              backgroundColor: 'var(--tw-prose-code-bg)',
              padding: '0.25em 0.4em',
              borderRadius: '0.25em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              color: 'var(--tw-prose-pre-code)',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              overflowX: 'auto',
              fontWeight: '400',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
              borderRadius: '0.375rem',
              padding: '1em 1.5em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: 'inherit',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::before': {
              content: '""',
            },
            'pre code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    shadcnPlugin,
  ],
};

export default config;
```

### 6.2 ShadCN UI 컴포넌트 활용

ShadCN UI 컴포넌트는 다음과 같은 방식으로 활용합니다:

1. **기본 컴포넌트 사용**: 
   - Button, Card, Input 등의 기본 컴포넌트를 직접 사용

2. **컴포넌트 확장**: 
   - 기본 컴포넌트를 확장하여 블로그 전용 컴포넌트 생성
   - 예: Button을 확장하여 소셜 공유 버튼 생성

3. **테마 통합**: 
   - ShadCN UI의 테마 시스템을 사용하여 일관된 디자인 적용
   - 다크 모드 지원

### 6.3 ShadCN UI 사용 예시

#### 6.3.1 버튼 컴포넌트

```tsx
// 기본 버튼 사용
import { Button } from "@/components/ui/button";

// 블로그 구독 버튼 예시
<Button variant="default" size="lg" className="w-full sm:w-auto">
  블로그 구독하기
</Button>

// 아웃라인 버튼 예시
<Button variant="outline" size="default">
  더보기
</Button>
```

#### 6.3.2 카드 컴포넌트

```tsx
// 기본 카드 사용
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

// 블로그 포스트 카드 예시
<Card className="overflow-hidden transition-shadow hover:shadow-md">
  <div className="aspect-video overflow-hidden">
    <img
      src="thumbnail.jpg"
      alt="썸네일"
      className="h-full w-full object-cover transition-transform hover:scale-105"
    />
  </div>
  <CardHeader>
    <CardTitle>포스트 제목</CardTitle>
    <CardDescription>2023년 5월 24일</CardDescription>
  </CardHeader>
  <CardContent>
    <p>포스트 내용 요약...</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <span>조회수 123</span>
    <Button variant="ghost" size="sm">자세히 보기</Button>
  </CardFooter>
</Card>
```

## 7. 접근성 고려사항

### 7.1 색상 대비

- 텍스트와 배경 간의 대비율이 WCAG AA 표준을 충족하도록 합니다.
- 다크 모드에서도 적절한 대비를 유지합니다.

### 7.2 키보드 접근성

- 모든 상호작용 요소는 키보드로 접근 가능해야 합니다.
- 포커스 상태가 시각적으로 명확해야 합니다.

### 7.3 스크린 리더 지원

- 의미 있는 대체 텍스트 제공
- ARIA 속성 적절히 사용
- 시맨틱 HTML 구조 유지

### 7.4 반응형 텍스트 크기

- 텍스트가 확대되어도 레이아웃이 깨지지 않아야 합니다.
- 사용자가 글꼴 크기를 조정할 수 있도록 rem/em 단위 사용

## 8. 결론

이 디자인 가이드는 웹 개발 학습자를 위한 기술 블로그의 디자인 시스템을 정의합니다. TailwindCSS와 ShadCN UI를 활용하여 일관되고 접근성 높은 사용자 경험을 제공하는 것을 목표로 합니다.

디자인 가이드를 따르면서도 필요에 따라 확장하고 개선할 수 있으며, 무엇보다 콘텐츠의 가독성과 접근성을 항상 최우선으로 고려해야 합니다.

새로운 컴포넌트나 패턴이 필요할 경우, 이 가이드의 기본 원칙과 스타일 시스템을 따라 확장하여 디자인의 일관성을 유지합니다.
