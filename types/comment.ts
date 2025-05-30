/**
 * 댓글 시스템 데이터 모델
 * 블로그 포스트의 댓글 및 대댓글 기능을 위한 TypeScript 타입 정의
 */

/**
 * 댓글 상태 열거형
 * 댓글의 승인/관리 상태를 나타냅니다
 */
export type CommentStatus = 
  | 'pending'     // 승인 대기
  | 'approved'    // 승인됨
  | 'rejected'    // 거부됨
  | 'spam'        // 스팸으로 분류
  | 'deleted';    // 삭제됨

/**
 * 댓글 정렬 옵션
 * 댓글 목록을 표시할 때 사용하는 정렬 방식
 */
export type CommentSortOption = 
  | 'newest'      // 최신순
  | 'oldest'      // 오래된순
  | 'popular'     // 인기순 (좋아요 많은순)
  | 'thread';     // 대화순 (대댓글 포함)

/**
 * 댓글 액션 타입
 * 댓글에 대해 수행할 수 있는 작업들
 */
export type CommentAction = 
  | 'like'        // 좋아요
  | 'dislike'     // 싫어요
  | 'reply'       // 답글
  | 'edit'        // 수정
  | 'delete'      // 삭제
  | 'report';     // 신고

/**
 * 댓글 신고 사유
 */
export type ReportReason = 
  | 'spam'        // 스팸
  | 'offensive'   // 욕설/모욕
  | 'inappropriate' // 부적절한 내용
  | 'copyright'   // 저작권 침해
  | 'other';      // 기타

/**
 * 댓글 메인 인터페이스
 * 블로그 포스트에 달린 개별 댓글의 완전한 데이터 구조
 */
export interface Comment {
  /** 댓글 고유 식별자 */
  id: string;
  
  /** 댓글이 달린 포스트 ID */
  postId: string;
  
  /** 작성자 이름 */
  authorName: string;
  
  /** 작성자 이메일 (표시하지 않음, 관리용) */
  authorEmail: string;
  
  /** 작성자 웹사이트 URL (선택적) */
  authorWebsite?: string;
  
  /** 작성자 아바타 URL (선택적) */
  authorImageUrl?: string;
  
  /** 작성자 Clerk User ID (선택적) */
  userId?: string;
  
  /** 댓글 내용 (마크다운 지원) */
  content: string;
  
  /** 댓글 작성 시간 */
  createdAt: Date;
  
  /** 댓글 수정 시간 (선택적) */
  updatedAt?: Date;
  
  /** 댓글 상태 */
  status: CommentStatus;
  
  /** 부모 댓글 ID (대댓글인 경우) */
  parentId?: string;
  
  /** 대댓글 목록 */
  replies?: Comment[];
  
  /** 좋아요 수 */
  likeCount: number;
  
  /** 싫어요 수 */
  dislikeCount: number;
  
  /** 신고 횟수 */
  reportCount: number;
  
  /** 작성자 IP 주소 (관리용, 표시하지 않음) */
  authorIp?: string;
  
  /** 작성자 User Agent (관리용) */
  userAgent?: string;
  
  /** 수정 여부 */
  isEdited: boolean;
  
  /** 고정 댓글 여부 */
  isPinned: boolean;
  
  /** 작성자가 블로그 소유자인지 여부 */
  isAuthor: boolean;
}

/**
 * 댓글 작성 폼 데이터
 * 새 댓글을 작성할 때 사용하는 데이터 구조
 */
export interface CommentFormData {
  /** 작성자 이름 (필수) */
  authorName: string;
  
  /** 작성자 이메일 (필수, 표시하지 않음) */
  authorEmail: string;
  
  /** 작성자 웹사이트 (선택적) */
  authorWebsite?: string;
  
  /** 작성자 아바타 URL (선택적) */
  authorImageUrl?: string;
  
  /** 작성자 Clerk User ID (선택적) */
  userId?: string;
  
  /** 댓글 내용 (필수) */
  content: string;
  
  /** 부모 댓글 ID (대댓글인 경우) */
  parentId?: string;
  
  /** 이메일 알림 동의 여부 */
  notifyByEmail?: boolean;
  
  /** 개인정보 처리 동의 여부 */
  agreeToTerms: boolean;
}

/**
 * 댓글 수정 폼 데이터
 * 기존 댓글을 수정할 때 사용하는 데이터 구조
 */
export interface CommentEditData {
  /** 댓글 ID */
  id: string;
  
  /** 수정할 내용 */
  content: string;
  
  /** 수정 사유 (선택적) */
  editReason?: string;
}

/**
 * 댓글 삭제 데이터
 */
export interface CommentDeleteData {
  /** 댓글 ID */
  id: string;
  
  /** 삭제 사유 (선택적) */
  deleteReason?: string;
  
  /** 완전 삭제 여부 (false면 소프트 삭제) */
  hardDelete?: boolean;
}

/**
 * 댓글 신고 데이터
 */
export interface CommentReportData {
  /** 신고할 댓글 ID */
  commentId: string;
  
  /** 신고 사유 */
  reason: ReportReason;
  
  /** 상세 신고 내용 */
  description?: string;
  
  /** 신고자 이메일 */
  reporterEmail?: string;
}

/**
 * 댓글 좋아요/싫어요 데이터
 */
export interface CommentReactionData {
  /** 댓글 ID */
  commentId: string;
  
  /** 반응 타입 */
  type: 'like' | 'dislike';
  
  /** 사용자 식별자 (IP 또는 세션 ID) */
  userId?: string;
}

/**
 * 댓글 목록 조회 옵션
 */
export interface CommentListOptions {
  /** 포스트 ID */
  postId: string;
  
  /** 정렬 방식 */
  sortBy?: CommentSortOption;
  
  /** 페이지 번호 */
  page?: number;
  
  /** 페이지당 댓글 수 */
  limit?: number;
  
  /** 승인된 댓글만 조회할지 여부 */
  approvedOnly?: boolean;
  
  /** 대댓글 포함 여부 */
  includeReplies?: boolean;
  
  /** 최대 대댓글 깊이 */
  maxReplyDepth?: number;
}

/**
 * 댓글 목록 응답 데이터
 */
export interface CommentListResponse {
  /** 댓글 목록 */
  comments: Comment[];
  
  /** 총 댓글 수 */
  totalCount: number;
  
  /** 현재 페이지 */
  currentPage: number;
  
  /** 총 페이지 수 */
  totalPages: number;
  
  /** 다음 페이지 존재 여부 */
  hasNextPage: boolean;
  
  /** 이전 페이지 존재 여부 */
  hasPrevPage: boolean;
}

/**
 * 댓글 통계 정보
 */
export interface CommentStats {
  /** 포스트 ID */
  postId: string;
  
  /** 총 댓글 수 */
  totalComments: number;
  
  /** 승인된 댓글 수 */
  approvedComments: number;
  
  /** 대기 중인 댓글 수 */
  pendingComments: number;
  
  /** 스팸 댓글 수 */
  spamComments: number;
  
  /** 오늘 작성된 댓글 수 */
  todayComments: number;
  
  /** 이번 주 작성된 댓글 수 */
  weekComments: number;
  
  /** 평균 댓글 길이 */
  avgCommentLength: number;
  
  /** 대댓글 비율 (%) */
  replyRatio: number;
}

/**
 * 댓글 필터 옵션
 */
export interface CommentFilterOptions {
  /** 상태별 필터 */
  status?: CommentStatus[];
  
  /** 날짜 범위 필터 */
  dateRange?: {
    start: Date;
    end: Date;
  };
  
  /** 작성자 이름 필터 */
  authorName?: string;
  
  /** 키워드 검색 */
  keyword?: string;
  
  /** 좋아요 수 최소값 */
  minLikes?: number;
  
  /** 신고 횟수 최대값 */
  maxReports?: number;
}

/**
 * 댓글 검증 규칙
 */
export interface CommentValidationRules {
  /** 작성자 이름 최소 길이 */
  minNameLength: number;
  
  /** 작성자 이름 최대 길이 */
  maxNameLength: number;
  
  /** 댓글 내용 최소 길이 */
  minContentLength: number;
  
  /** 댓글 내용 최대 길이 */
  maxContentLength: number;
  
  /** 이메일 필수 여부 */
  requireEmail: boolean;
  
  /** 웹사이트 URL 검증 여부 */
  validateWebsite: boolean;
  
  /** 금지된 키워드 목록 */
  bannedWords: string[];
  
  /** HTML 태그 허용 여부 */
  allowHtml: boolean;
  
  /** 마크다운 허용 여부 */
  allowMarkdown: boolean;
}

/**
 * 댓글 설정 인터페이스
 */
export interface CommentSettings {
  /** 댓글 기능 활성화 여부 */
  enabled: boolean;
  
  /** 댓글 자동 승인 여부 */
  autoApprove: boolean;
  
  /** 관리자 승인 필요 여부 */
  requireModeration: boolean;
  
  /** 이메일 인증 필요 여부 */
  requireEmailVerification: boolean;
  
  /** 스팸 필터 활성화 여부 */
  enableSpamFilter: boolean;
  
  /** 대댓글 허용 여부 */
  allowReplies: boolean;
  
  /** 최대 대댓글 깊이 */
  maxReplyDepth: number;
  
  /** 댓글 수정 허용 시간 (분) */
  editTimeLimit: number;
  
  /** 댓글 삭제 허용 시간 (분) */
  deleteTimeLimit: number;
  
  /** 페이지당 댓글 수 */
  commentsPerPage: number;
  
  /** 검증 규칙 */
  validationRules: CommentValidationRules;
}

/**
 * 댓글 이벤트 타입
 * 댓글 관련 이벤트를 처리할 때 사용
 */
export type CommentEvent = 
  | 'comment:created'     // 댓글 생성됨
  | 'comment:updated'     // 댓글 수정됨
  | 'comment:deleted'     // 댓글 삭제됨
  | 'comment:approved'    // 댓글 승인됨
  | 'comment:rejected'    // 댓글 거부됨
  | 'comment:reported'    // 댓글 신고됨
  | 'comment:liked'       // 댓글 좋아요
  | 'comment:replied';    // 댓글 답글 작성됨

/**
 * 댓글 이벤트 데이터
 */
export interface CommentEventData {
  /** 이벤트 타입 */
  type: CommentEvent;
  
  /** 댓글 데이터 */
  comment: Comment;
  
  /** 이벤트 발생 시간 */
  timestamp: Date;
  
  /** 추가 메타데이터 */
  metadata?: Record<string, any>;
}

/**
 * 댓글 컨텍스트 (React Context용)
 */
export interface CommentContextType {
  /** 현재 포스트의 댓글 목록 */
  comments: Comment[];
  
  /** 로딩 상태 */
  loading: boolean;
  
  /** 에러 상태 */
  error: string | null;
  
  /** 댓글 추가 함수 */
  addComment: (data: CommentFormData) => Promise<Comment>;
  
  /** 댓글 수정 함수 */
  updateComment: (data: CommentEditData) => Promise<Comment>;
  
  /** 댓글 삭제 함수 */
  deleteComment: (data: CommentDeleteData) => Promise<void>;
  
  /** 댓글 좋아요/싫어요 함수 */
  reactToComment: (data: CommentReactionData) => Promise<void>;
  
  /** 댓글 신고 함수 */
  reportComment: (data: CommentReportData) => Promise<void>;
  
  /** 댓글 목록 새로고침 함수 */
  refreshComments: () => Promise<void>;
}

/**
 * 댓글 API 응답 타입
 */
export interface CommentApiResponse<T = any> {
  /** 성공 여부 */
  success: boolean;
  
  /** 응답 데이터 */
  data?: T;
  
  /** 에러 메시지 */
  error?: string;
  
  /** 에러 코드 */
  errorCode?: string;
  
  /** 메타데이터 */
  meta?: {
    totalCount?: number;
    page?: number;
    limit?: number;
  };
}

/**
 * 타입 가드 함수들
 */

/**
 * Comment 타입 가드
 */
export function isComment(obj: any): obj is Comment {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.postId === 'string' &&
    typeof obj.authorName === 'string' &&
    typeof obj.authorEmail === 'string' &&
    typeof obj.content === 'string' &&
    obj.createdAt instanceof Date &&
    typeof obj.status === 'string' &&
    typeof obj.likeCount === 'number' &&
    typeof obj.dislikeCount === 'number'
  );
}

/**
 * CommentFormData 타입 가드
 */
export function isCommentFormData(obj: any): obj is CommentFormData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.authorName === 'string' &&
    typeof obj.authorEmail === 'string' &&
    typeof obj.content === 'string' &&
    typeof obj.agreeToTerms === 'boolean'
  );
}

/**
 * 유틸리티 타입들
 */

/**
 * 댓글 생성용 타입 (ID 제외)
 */
export type CreateCommentData = Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'likeCount' | 'dislikeCount' | 'reportCount' | 'isEdited'>;

/**
 * 댓글 업데이트용 타입 (수정 가능한 필드만)
 */
export type UpdateCommentData = Pick<Comment, 'id' | 'content' | 'status'> & {
  updatedAt: Date;
  isEdited: boolean;
};

/**
 * 공개용 댓글 타입 (민감한 정보 제외)
 */
export type PublicComment = Omit<Comment, 'authorEmail' | 'authorIp' | 'userAgent'>;

/**
 * 댓글 요약 타입 (목록용)
 */
export type CommentSummary = Pick<Comment, 'id' | 'authorName' | 'content' | 'createdAt' | 'likeCount' | 'status'> & {
  replyCount: number;
}; 