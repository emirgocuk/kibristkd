import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwindcss from 'eslint-plugin-tailwindcss'; // EKLENTİYİ IMPORT EDİN
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    // extends'i plugins ile değiştirerek daha modern bir yapıya geçiyoruz
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      tailwindcss, // EKLENTİYİ BURAYA EKLEYİN
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs['recommended-latest'].rules,
      ...reactRefresh.configs.vite.rules,
      ...tailwindcss.configs.recommended.rules, // EKLENTİNİN KURALLARINI EKLEYİN
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // İsteğe bağlı: Tailwind sınıf sıralamasını zorunlu kıl
      'tailwindcss/classnames-order': 'warn',
    },
  },
]);