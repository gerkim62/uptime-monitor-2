//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import tseslint from '@typescript-eslint/eslint-plugin'


export default [
  ...tanstackConfig,
  {
    ignores: [
      'src/components/ui/**',
      '.output/**',
      'eslint.config.js',
      'prettier.config.js',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@typescript-eslint': tseslint },
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
      'no-await-in-loop': 'warn',
    },
  },
]
