'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AlertCircle, RefreshCw, LogIn, Home, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AuthError, AuthErrorType, getRetryDelay, logAuthError } from '@/lib/auth-utils'

/**
 * 인증 오류 처리 컴포넌트의 Props
 */
interface AuthErrorHandlerProps {
  error: AuthError | null
  onRetry?: () => void
  onDismiss?: () => void
  className?: string
  showAsToast?: boolean
  showAsAlert?: boolean
  autoRetry?: boolean
  maxRetryAttempts?: number
}

/**
 * 사용자 친화적인 인증 오류 처리 컴포넌트
 * 
 * 기능:
 * - 토스트 알림으로 오류 표시
 * - 알림 카드로 오류 표시
 * - 자동 재시도 기능
 * - 적절한 액션 버튼 제공
 */
export function AuthErrorHandler({
  error,
  onRetry,
  onDismiss,
  className = '',
  showAsToast = true,
  showAsAlert = false,
  autoRetry = false,
  maxRetryAttempts = 3
}: AuthErrorHandlerProps) {
  const router = useRouter()
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  /**
   * 오류 발생 시 토스트 알림 표시
   */
  useEffect(() => {
    if (!error || !showAsToast) return

    // 오류 로깅 (개발 환경)
    logAuthError(error, 'AuthErrorHandler')

    // 토스트 알림 표시
    const toastId = toast[error.severity](error.title, {
      description: error.message,
      duration: error.severity === 'error' ? 8000 : 5000,
      action: error.action && {
        label: error.action,
        onClick: () => handleAction(error)
      },
      onDismiss: onDismiss
    })

    // 자동 재시도 설정
    if (autoRetry && error.canRetry && retryCount < maxRetryAttempts) {
      const delay = getRetryDelay(error.type, retryCount + 1)
      if (delay > 0) {
        toast.info('자동 재시도 중...', {
          duration: delay,
          description: `${Math.ceil(delay / 1000)}초 후 다시 시도합니다.`
        })

        setTimeout(() => {
          setRetryCount(prev => prev + 1)
          handleRetry()
        }, delay)
      }
    }

    return () => {
      toast.dismiss(toastId)
    }
  }, [error, showAsToast, autoRetry, retryCount, maxRetryAttempts])

  /**
   * 액션 버튼 클릭 처리
   */
  const handleAction = async (authError: AuthError) => {
    if (authError.actionUrl) {
      // URL 이동
      router.push(authError.actionUrl)
    } else if (authError.canRetry) {
      // 재시도
      await handleRetry()
    }
  }

  /**
   * 재시도 처리
   */
  const handleRetry = async () => {
    if (!onRetry || isRetrying) return

    setIsRetrying(true)
    try {
      await onRetry()
      toast.success('성공!', {
        description: '작업이 완료되었습니다.'
      })
      setRetryCount(0)
    } catch (retryError) {
      console.error('Retry failed:', retryError)
      toast.error('재시도 실패', {
        description: '다시 시도해 주세요.'
      })
    } finally {
      setIsRetrying(false)
    }
  }

  /**
   * 오류 타입에 따른 아이콘 반환
   */
  const getErrorIcon = (errorType: AuthErrorType) => {
    switch (errorType) {
      case AuthErrorType.SESSION_EXPIRED:
      case AuthErrorType.UNAUTHORIZED:
        return <LogIn className="h-4 w-4" />
      case AuthErrorType.EMAIL_NOT_VERIFIED:
        return <Mail className="h-4 w-4" />
      case AuthErrorType.NETWORK_ERROR:
      case AuthErrorType.RATE_LIMITED:
        return <RefreshCw className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  /**
   * 알림 카드로 표시할 경우
   */
  if (showAsAlert && error) {
    return (
      <Alert className={`${className} border-l-4 ${
        error.severity === 'error' ? 'border-l-red-500 bg-red-50' :
        error.severity === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
        'border-l-blue-500 bg-blue-50'
      }`}>
        <div className="flex items-start space-x-3">
          <div className={`${
            error.severity === 'error' ? 'text-red-600' :
            error.severity === 'warning' ? 'text-yellow-600' :
            'text-blue-600'
          }`}>
            {getErrorIcon(error.type)}
          </div>
          <div className="flex-1">
            <AlertTitle className="text-sm font-medium mb-1">
              {error.title}
            </AlertTitle>
            <AlertDescription className="text-sm text-gray-600 mb-3">
              {error.message}
            </AlertDescription>
            <div className="flex space-x-2">
              {error.action && (
                <Button
                  size="sm"
                  variant={error.severity === 'error' ? 'destructive' : 'default'}
                  onClick={() => handleAction(error)}
                  disabled={isRetrying}
                  className="text-xs"
                >
                  {isRetrying ? (
                    <>
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      처리 중...
                    </>
                  ) : (
                    error.action
                  )}
                </Button>
              )}
              {onDismiss && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onDismiss}
                  className="text-xs"
                >
                  닫기
                </Button>
              )}
            </div>
          </div>
        </div>
      </Alert>
    )
  }

  // 토스트만 사용할 경우 렌더링할 내용 없음
  return null
}

/**
 * 인증 오류를 간단하게 토스트로 표시하는 훅
 */
export function useAuthErrorToast() {
  const showError = (error: AuthError) => {
    logAuthError(error, 'useAuthErrorToast')
    
    toast[error.severity](error.title, {
      description: error.message,
      duration: error.severity === 'error' ? 8000 : 5000,
      action: error.action && error.actionUrl ? {
        label: error.action,
        onClick: () => window.location.href = error.actionUrl!
      } : undefined
    })
  }

  const showSuccess = (message: string, description?: string) => {
    toast.success(message, {
      description,
      duration: 4000
    })
  }

  const showLoading = (message: string) => {
    return toast.loading(message)
  }

  const dismiss = (toastId?: string | number) => {
    toast.dismiss(toastId)
  }

  return {
    showError,
    showSuccess,
    showLoading,
    dismiss
  }
}

/**
 * 댓글 작성 시 인증 오류 처리를 위한 특화된 컴포넌트
 */
interface CommentAuthErrorProps {
  onLoginClick?: () => void
}

export function CommentAuthError({ onLoginClick }: CommentAuthErrorProps) {
  const router = useRouter()

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick()
    } else {
      router.push('/sign-in?redirect_url=' + encodeURIComponent(window.location.pathname))
    }
  }

  return (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center bg-gray-50">
      <LogIn className="h-8 w-8 text-gray-400 mx-auto mb-3" />
      <h3 className="text-sm font-medium text-gray-900 mb-2">
        로그인이 필요합니다
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        댓글을 작성하려면 먼저 로그인해 주세요.
      </p>
      <div className="space-x-2">
        <Button onClick={handleLoginClick} size="sm">
          <LogIn className="h-4 w-4 mr-2" />
          로그인하기
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.push('/sign-up')}
        >
          회원가입
        </Button>
      </div>
    </div>
  )
}

/**
 * 전역 인증 오류 처리를 위한 Provider 컴포넌트
 */
interface AuthErrorProviderProps {
  children: React.ReactNode
}

export function AuthErrorProvider({ children }: AuthErrorProviderProps) {
  // 전역 오류 상태를 관리하고 필요시 확장 가능
  useEffect(() => {
    // 전역 오류 이벤트 리스너 등록
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Clerk 관련 오류 감지 및 처리
      if (event.reason?.message?.includes('clerk') || 
          event.reason?.errors?.length > 0) {
        console.warn('Unhandled auth error detected:', event.reason)
        // 필요시 전역 오류 처리 로직 추가
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return <>{children}</>
} 