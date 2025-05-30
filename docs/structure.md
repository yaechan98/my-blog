# 블로그 프로젝트 폴더 구조

이 문서는 Next.js 15+ App Router 기반 블로그 프로젝트의 폴더 구조를 설명합니다.

## 프로젝트 개요

- **프레임워크**: Next.js 15+
- **스타일링**: TailwindCSS + ShadCN UI
- **언어**: TypeScript
- **아키텍처**: App Router

## 폴더 구조

```
my_blog/
├── app/                            # Next.js App Router 루트 디렉토리
│   ├── (blog)/                     # 블로그 관련 라우트 그룹
│   │   ├── posts/                  # 블로그 포스트 목록 페이지
│   │   │   ├── [slug]/             # 블로그 포스트 상세 페이지
│   │   │   │   ├── page.tsx        # 포스트 상세 페이지 컴포넌트
│   │   │   │   └── loading.tsx     # 포스트 상세 로딩 상태
│   │   │   └── page.tsx            # 포스트 목록 페이지 컴포넌트
│   │   ├── categories/             # 카테고리별 페이지
│   │   │   ├── [slug]/             # 특정 카테고리의 포스트 목록
│   │   │   │   └── page.tsx        # 카테고리별 포스트 목록 페이지
│   │   │   └── page.tsx            # 전체 카테고리 목록 페이지
│   │   └── search/                 # 검색 관련 페이지
│   │       └── page.tsx            # 검색 결과 페이지
│   ├── about/                      # 소개 페이지
│   │   └── page.tsx                # 소개 페이지 컴포넌트
│   ├── error.tsx                   # 전역 에러 페이지
│   ├── favicon.ico                 # 파비콘
│   ├── globals.css                 # 전역 스타일
│   ├── layout.tsx                  # 루트 레이아웃
│   ├── loading.tsx                 # 전역 로딩 상태
│   ├── not-found.tsx               # 404 페이지
│   └── page.tsx                    # 홈페이지
├── components/                     # 컴포넌트 디렉토리
│   ├── blog/                       # 블로그 관련 컴포넌트
│   │   ├── comment-section.tsx     # 댓글 섹션 컴포넌트
│   │   ├── post-card.tsx           # 포스트 카드 컴포넌트
│   │   ├── post-content.tsx        # 포스트 내용 렌더링 컴포넌트
│   │   ├── post-header.tsx         # 포스트 헤더 컴포넌트
│   │   ├── related-posts.tsx       # 관련 포스트 컴포넌트
│   │   ├── search-bar.tsx          # 검색 바 컴포넌트
│   │   ├── category-list.tsx       # 카테고리 목록 컴포넌트
│   │   └── tag-list.tsx            # 태그 목록 컴포넌트
│   ├── common/                     # 공통 컴포넌트
│   │   ├── footer.tsx              # 푸터 컴포넌트
│   │   ├── header.tsx              # 헤더 컴포넌트
│   │   ├── navigation.tsx          # 네비게이션 컴포넌트
│   │   ├── newsletter-signup.tsx   # 뉴스레터 구독 컴포넌트
│   │   └── social-links.tsx        # 소셜 미디어 링크 컴포넌트
│   └── ui/                         # UI 컴포넌트 (ShadCN)
│       ├── ...                     # ShadCN UI 컴포넌트들
│       └── theme-toggle.tsx        # 테마 전환 버튼 (다크/라이트 모드)
├── config/                         # 설정 파일
│   ├── site.ts                     # 사이트 설정 (제목, 설명 등)
│   └── nav.ts                      # 네비게이션 설정
├── data/                           # 데이터 파일
│   ├── posts/                      # 블로그 포스트 데이터
│   │   └── [slug].mdx              # 개별 포스트 파일 (MDX 형식)
│   ├── categories.ts               # 카테고리 데이터
│   └── authors.ts                  # 작성자 데이터
├── docs/                           # 프로젝트 문서
│   ├── requirements.md             # 요구사항 문서
│   └── structure.md                # 폴더 구조 문서 (현재 파일)
├── hooks/                          # 커스텀 훅
│   ├── use-mobile.tsx              # 모바일 감지 훅
│   ├── use-search.ts               # 검색 기능 훅
│   └── use-theme.ts                # 테마 관리 훅
├── lib/                            # 유틸리티 함수
│   ├── api/                        # API 관련 유틸리티
│   │   └── posts.ts                # 포스트 데이터 가져오기 함수
│   ├── utils.ts                    # 일반 유틸리티 함수
│   ├── mdx.ts                      # MDX 관련 유틸리티
│   └── seo.ts                      # SEO 관련 유틸리티
├── public/                         # 정적 파일
│   ├── images/                     # 이미지 파일
│   │   └── ...                     # 각종 이미지 파일
│   └── ...                         # 기타 정적 파일
├── styles/                         # 스타일 관련 파일
│   └── mdx.css                     # MDX 콘텐츠 스타일
├── types/                          # 타입 정의 파일
│   ├── post.ts                     # 포스트 관련 타입
│   ├── comment.ts                  # 댓글 관련 타입
│   └── index.ts                    # 공통 타입 내보내기
├── components.json                 # ShadCN 설정
├── eslint.config.mjs               # ESLint 설정
├── next-env.d.ts                   # Next.js 타입 정의
├── next.config.ts                  # Next.js 설정
├── package.json                    # 패키지 정보
├── postcss.config.mjs              # PostCSS 설정
├── README.md                       # 프로젝트 설명
├── tailwind.config.ts              # Tailwind CSS 설정
└── tsconfig.json                   # TypeScript 설정
```

## 폴더 및 파일 역할 설명

### App 디렉토리 구조

App Router는 파일 시스템 기반 라우팅을 사용합니다. 각 폴더는 URL 경로에 매핑됩니다.

#### 라우트 그룹화

- **(blog)/** - 괄호로 묶인 폴더는 URL에 영향을 주지 않는 라우트 그룹입니다. 블로그 관련 페이지들을 논리적으로 그룹화합니다.

#### 동적 라우트

- **[slug]/** - 대괄호로 묶인 폴더는 동적 세그먼트를 나타냅니다. 블로그 포스트의 고유 식별자나 카테고리 이름과 같은 동적 값을 처리합니다.

#### 특수 파일

- **page.tsx** - 라우트의 UI를 정의합니다.
- **layout.tsx** - 공유 레이아웃을 정의합니다.
- **loading.tsx** - 로딩 상태를 정의합니다.
- **error.tsx** - 에러 처리 UI를 정의합니다.
- **not-found.tsx** - 404 페이지를 정의합니다.

### 컴포넌트 구조

컴포넌트는 역할에 따라 세 가지 카테고리로 나뉩니다:

#### 블로그 컴포넌트

블로그 기능에 특화된 컴포넌트들입니다.

- **post-card.tsx** - 포스트 미리보기 카드
- **post-content.tsx** - 포스트 내용 렌더링
- **comment-section.tsx** - 댓글 섹션

#### 공통 컴포넌트

애플리케이션 전체에서 재사용되는 컴포넌트들입니다.

- **header.tsx** - 사이트 헤더
- **footer.tsx** - 사이트 푸터
- **navigation.tsx** - 네비게이션 메뉴

#### UI 컴포넌트

ShadCN UI 기반 기본 UI 컴포넌트들입니다.

### 데이터 및 유틸리티 구조

#### 데이터 폴더

- **posts/** - MDX 형식의 블로그 포스트 파일들
- **categories.ts** - 카테고리 정보
- **authors.ts** - 작성자 정보

#### 라이브러리 폴더

- **api/** - 데이터 가져오기 함수들
- **mdx.ts** - MDX 파싱 및 처리 유틸리티
- **seo.ts** - SEO 관련 유틸리티

#### 타입 폴더

- **post.ts** - 포스트 관련 타입 정의
- **comment.ts** - 댓글 관련 타입 정의

## 확장 고려사항

### 국제화 (i18n)

향후 다국어 지원이 필요한 경우, Next.js의 국제화 기능을 활용할 수 있습니다:

```
app/
├── [lang]/
│   ├── (blog)/
│   │   ├── posts/
│   │   └── ...
│   └── ...
```

### 인증 및 사용자 관리

사용자 인증이 필요한 경우 추가할 수 있는 구조:

```
app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── profile/
├── components/
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
```

### 관리자 대시보드

콘텐츠 관리를 위한 관리자 대시보드 추가:

```
app/
├── (admin)/
│   ├── dashboard/
│   ├── posts/
│   │   ├── create/
│   │   └── edit/[id]/
│   └── settings/
```

## 네이밍 규칙

- **폴더명**: kebab-case 사용 (예: blog-components)
- **파일명**: 컴포넌트는 camelCase 또는 PascalCase (예: postCard.tsx 또는 PostCard.tsx)
- **타입 정의**: PascalCase (예: PostType, CommentProps)
- **유틸리티 함수**: camelCase (예: formatDate, slugify)

## 라우팅 구조 요약

- **/** - 홈페이지
- **/posts** - 블로그 포스트 목록
- **/posts/[slug]** - 개별 포스트 상세 페이지
- **/categories** - 카테고리 목록
- **/categories/[slug]** - 특정 카테고리의 포스트 목록
- **/search** - 검색 결과 페이지
- **/about** - 소개 페이지

## 결론

이 폴더 구조는 확장성과 유지보수성을 고려하여 설계되었습니다. Next.js의 App Router 패턴을 따르며, 컴포넌트와 기능을 논리적으로 구성하여 코드 베이스의 명확성과 재사용성을 높입니다.

미래에 기능이 추가되더라도 이 구조 내에서 자연스럽게 확장될 수 있으며, 팀 작업 시에도 각 구성원이 담당 영역을 명확히 구분할 수 있습니다.
