import boundaries from 'eslint-plugin-boundaries'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

const eslintConfig = [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'dist-ssr/**',
      '*.local',
      'src/generated/**',
      'generated/**',
      'src/routeTree.gen.ts',
    ],
  },
  // Config for config files (no type checking needed)
  {
    files: ['eslint.config.js', 'prettier.config.js', 'vite.config.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'never',
        },
      ],
    },
  },
  // Config for source files (with type checking)
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      boundaries,
    },
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          mode: 'full',
          type: 'shared',
          pattern: [
            'src/components/**/*',
            'src/hooks/**/*',
            'src/lib/**/*',
            'src/data/**/*',
            'src/env.ts',
            'src/db.ts',
            'src/styles.css',
          ],
        },
        {
          mode: 'full',
          type: 'feature',
          pattern: ['src/features/**/*'],
        },
        {
          mode: 'full',
          type: 'routes',
          pattern: ['src/routes/**/*'],
        },
        {
          mode: 'full',
          type: 'neverImport',
          pattern: ['src/**/*'],
        },
      ],
    },
    rules: {
      // TypeScript rules - disallow any, as, and !
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'never',
        },
      ],
      '@typescript-eslint/no-deprecated': 'warn',
      // Async/Promise rules
      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'warn',
      'no-promise-executor-return': 'error',
      'require-atomic-updates': 'error',
      'max-nested-callbacks': ['warn', 3],
      'no-return-await': 'warn',
      'prefer-promise-reject-errors': 'error',
      // Boundaries rules
      'boundaries/no-unknown': ['error'],
      'boundaries/no-unknown-files': ['error'],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['shared'],
              allow: ['shared'],
            },
            {
              from: ['feature'],
              allow: ['shared'],
            },
            {
              from: ['routes'],
              allow: ['shared', 'feature'],
            },
            {
              from: ['neverImport'],
              allow: ['shared', 'routes'],
            },
          ],
        },
      ],
    },
  },
]

export default eslintConfig
