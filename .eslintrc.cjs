module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    './.eslintrc-auto-import.json',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  ignorePatterns: [
    'dist/*',
    'cypress/*',
    'src/auto-imports.d.ts',
    'src/components.d.ts',
    'src/types.ts',
    'src/shims.d.ts',
    'src/client.d.ts',
  ],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/object-curly-spacing': [2, 'always'],
    'vue/html-closing-bracket-spacing': [
      2,
      {
        selfClosingTag: 'always',
      },
    ],
    // "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn"
    // 'vue/max-attributes-per-line': [
    //   2,
    //   {
    //     singleline: {
    //       max: 1,
    //     },
    //     multiline: {
    //       max: 1,
    //     },
    //   },
    // ],
  },
}
