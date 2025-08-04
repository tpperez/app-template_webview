// eslint configuration file using flat config format
// this file defines code quality rules and import organization for the project

// import eslint compatibility layer for legacy config support
import { FlatCompat } from '@eslint/eslintrc'
// import custom eslint plugins for enhanced code quality
import eslintPluginPreferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
// node.js utilities for file path handling
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// get current file directory for eslint configuration
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// create compatibility layer to use legacy eslint configs with flat config
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// main eslint configuration array
const eslintConfig = [
  // extend popular preset configurations for next.js and accessibility
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ),

  // custom rule configuration object
  {
    // register plugins that provide additional linting rules
    plugins: {
      'eslint-plugin-prefer-arrow-functions': eslintPluginPreferArrowFunctions,
      'eslint-plugin-react': eslintPluginReact,
      'eslint-plugin-prettier': eslintPluginPrettier,
      'simple-import-sort': eslintPluginSimpleImportSort,
    },

    // define specific linting rules and their severity levels
    rules: {
      // prettier integration - treat formatting issues as errors
      'eslint-plugin-prettier/prettier': ['error'],

      // function style enforcement - always use block body in arrow functions
      'arrow-body-style': ['error', 'always'],

      // parentheses around arrow function parameters - always required
      'arrow-parens': ['error', 'always'],

      // typescript strict typing - prohibit 'any' type usage
      '@typescript-eslint/no-explicit-any': 'error',

      // import organization and positioning rules
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      // encourage arrow function usage over traditional function declarations
      'eslint-plugin-prefer-arrow-functions/prefer-arrow-functions': [
        'warn',
        {
          returnStyle: 'explicit',
        },
      ],

      // react jsx formatting - wrap multiline jsx in parentheses
      'eslint-plugin-react/jsx-wrap-multilines': [
        'warn',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
        },
      ],

      // prohibit relative imports with parent directory navigation
      'no-restricted-imports': [
        'error',
        {
          patterns: ['../*', '../../*', '../../../*'],
        },
      ],

      // organize imports in specific order and restrict to allowed patterns
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // react imports first
            ['^react$', '^react/'],
            // next.js framework imports
            ['^next/'],
            // node.js built-in modules
            ['^node:'],
            // external packages from node_modules
            ['^@?\\w'],
            // internal absolute imports using @ alias
            ['^@/'],
            // relative imports from current directory only
            ['^\\.'],
            // css imports always last
            ['^.+\\.css$'],
          ],
        },
      ],

      // automatically sort export statements alphabetically
      'simple-import-sort/exports': 'error',
    },
  },
]

// export the complete eslint configuration
export default eslintConfig
