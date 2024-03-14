module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  // Extends: Realiza o extend da biblioteca ESLint, que implanta a análise do style guidesJS Standard Style, definido a estrutura que deve ser utilizada como default;
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'standard-with-typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // desabilita a config do eslint onde ele dita que so pode usar ou interface ou type
    "@typescript-eslint/consistent-type-definitions": "off",
    // ele não deixa fazer comparação que não seja booleana
    "@typescript-eslint/strict-boolean-expressions": "off",
  },
}
