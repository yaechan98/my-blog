/**
 * Clerk 사용자 ID는 string (UUID 아님)
 * 2025년 Clerk Third-Party Auth 및 Supabase 스키마 기반 타입 정의
 */

/** 카테고리 테이블 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  color: string | null;
  description: string | null;
}

/** 게시물 테이블 */
export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  author_id: string; // Clerk 사용자 ID
  category_id: number | null;
  status: string | null;
  cover_image_url: string | null;
  view_count: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/** 댓글 테이블 */
export interface Comment {
  id: number;
  post_id: number;
  user_id: string; // Clerk 사용자 ID
  content: string;
  user_name?: string | null;    // ← 추가
  user_email?: string | null;   // ← 추가
  parent_id?: number | null;    // ← 추가
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/** 좋아요 테이블 */
export interface Like {
  id: number;
  post_id: number;
  user_id: string; // Clerk 사용자 ID
  created_at: string; // ISO timestamp
}

/** Clerk 사용자 정보 타입 */
export interface ClerkUser {
  id: string; // Clerk 사용자 ID
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** JWT 클레임 타입 (Third-Party Auth) */
export interface ClerkJwtClaims {
  sub: string; // Clerk 사용자 ID
  role: "authenticated" | "anon";
  email?: string;
  [key: string]: unknown;
}

/** Supabase Database 타입 (Row/Insert/Update) */
export type Database = {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, "id"> & { id?: number };
        Update: Partial<Omit<Category, "id">>;
      };
      posts: {
        Row: Post;
        Insert: Omit<Post, "id" | "created_at" | "updated_at" | "view_count"> & {
          id?: number;
          created_at?: string;
          updated_at?: string;
          view_count?: number;
        };
        Update: Partial<Omit<Post, "id">>;
      };
      comments: {
        Row: Comment;
        Insert: Omit<Comment, "id" | "created_at" | "updated_at"> & {
          id?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Comment, "id">>;
      };
      likes: {
        Row: Like;
        Insert: Omit<Like, "id" | "created_at"> & {
          id?: number;
          created_at?: string;
        };
        Update: Partial<Omit<Like, "id">>;
      };
    };
    Views: {};
    Functions: {};
  };
};

/** 관계형 데이터 확장 타입 예시 */
export interface PostWithCategory extends Post {
  category?: Category | null;
}

/** 세션 기반 Clerk 사용자 타입 (useSession 훅 호환) */
export interface ClerkSession {
  userId: string;
  sessionId: string;
  claims: ClerkJwtClaims;
  expiresAt: number;
}

/** API 응답 타입 (일반) */
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/** 페이지네이션 응답 타입 */
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};