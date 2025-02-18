import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      // 命名規則
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'method',
          format: ['camelCase'],
        },
        {
          selector: 'classProperty',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
      ],

      // メソッドのアクセシビリティ
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],

      // 型の明示的な指定
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],

      // プリミティブ型の明示的な指定を禁止
      '@typescript-eslint/no-inferrable-types': 'warn',

      // 未使用の変数
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // Promise の適切な処理
      '@typescript-eslint/no-floating-promises': 'warn',

      // 一般的なルール
      eqeqeq: 'warn',
      'no-throw-literal': 'warn',
      semi: 'warn',
      quotes: ['warn', 'single', { allowTemplateLiterals: true }],

      // 配列の型指定
      '@typescript-eslint/array-type': [
        'warn',
        {
          default: 'array',
        },
      ],

      // 装飾子忘れの防止
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],

      // プロミスの戻り値の型指定
      '@typescript-eslint/promise-function-async': 'warn',

      // オブジェクトの型指定
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],

      // 不要なキャスト
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',

      // 明示的なany
      '@typescript-eslint/no-explicit-any': 'warn',

      // 固定された条件
      'no-constant-condition': 'error',
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
];
