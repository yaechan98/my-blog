# ESLint 에러 수정 가이드

## 주요 에러 유형 및 해결 방법

### 1. no-unused-vars 에러
```typescript
// 잘못된 예
const unusedVariable = 'value';

// 올바른 예 - 변수명 앞에 언더스코어 추가 또는 제거
const _unusedVariable = 'value'; // 의도적으로 사용하지 않는 경우
// 또는 완전히 제거
```

### 2. no-explicit-any 에러
```typescript
// 잘못된 예
function process(data: any): any {
  return data;
}

// 올바른 예
interface ProcessData {
  id: string;
  name: string;
}

function process(data: ProcessData): ProcessData {
  return data;
}
```

### 3. React Hook Dependencies 에러
```typescript
// 잘못된 예
useEffect(() => {
  doSomething(value);
}, []); // value가 의존성에 없음

// 올바른 예
useEffect(() => {
  doSomething(value);
}, [value]); // value를 의존성에 추가
```

### 4. Image 최적화 경고
```typescript
// 잘못된 예
<img src="/image.jpg" alt="description" />

// 올바른 예
import Image from 'next/image';
<Image src="/image.jpg" alt="description" width={500} height={300} />
```

## 빠른 수정 방법

### ESLint 규칙 일시적 비활성화
특정 라인에서만 비활성화:
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = response;
```

파일 전체에서 비활성화:
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
```

### 권장 해결 순서
1. 미사용 변수/import 제거
2. any 타입을 구체적 타입으로 변경
3. React Hook 의존성 추가
4. Image 태그를 Next.js Image로 변경
5. 필요시 ESLint 규칙 비활성화

## 일괄 수정을 위한 설정

`.eslintrc.json` 파일에서 특정 규칙 비활성화:
```json
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "@next/next/no-img-element": "warn"
  }
}
```
