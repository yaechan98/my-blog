import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            블로그 회원가입
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <a
              href="/sign-in"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              로그인하기
            </a>
          </p>
        </div>
        
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: 
                'bg-blue-600 hover:bg-blue-700 text-white',
              card: 
                'bg-white shadow-xl rounded-xl border-0',
              headerTitle: 
                'text-gray-900 font-bold',
              headerSubtitle: 
                'text-gray-600',
              socialButtonsBlockButton: 
                'border border-gray-300 hover:border-gray-400',
              socialButtonsBlockButtonText: 
                'text-gray-600 font-medium',
              formFieldInput: 
                'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
              footerActionLink: 
                'text-blue-600 hover:text-blue-500',
              dividerLine: 
                'bg-gray-200',
              dividerText: 
                'text-gray-500'
            },
            layout: {
              socialButtonsPlacement: 'top',
              logoPlacement: 'inside'
            }
          }}
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/"
          afterSignUpUrl="/"
        />
      </div>
    </div>
  );
}
