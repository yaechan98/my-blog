import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            블로그 로그인
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            또는{' '}
            <a
              href="/sign-up"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              새 계정 만들기
            </a>
          </p>
        </div>
        
        <SignIn
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
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          redirectUrl="/"
          afterSignInUrl="/"
        />
      </div>
    </div>
  );
}
