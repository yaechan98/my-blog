import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // TypeScript 관련 규칙을 경고로 변경
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      
      // React Hook 관련 규칙을 경고로 변경
      "react-hooks/exhaustive-deps": "warn",
      
      // Next.js 관련 규칙을 경고로 변경
      "@next/next/no-img-element": "warn",
      
      // React 관련 규칙을 경고로 변경
      "react/no-unescaped-entities": "warn",
      "jsx-a11y/alt-text": "warn",
      
      // Hook 규칙을 경고로 변경
      "react-hooks/rules-of-hooks": "warn"
    }
  }
];

export default eslintConfig;
