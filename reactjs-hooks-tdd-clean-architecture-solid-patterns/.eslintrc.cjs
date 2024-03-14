module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  // Extends: Realiza o extend da biblioteca ESLint, que implanta a análise do style guidesJS Standard Style, definido a estrutura que deve ser utilizada como default;
  extends: [
    // Inseridos por mim
    // Estende o style guide do eslint com as regras do standard
    'standard-with-typescript',

    // Ja veio com vite
    'eslint:recommended',
    // O plugin: --> Nada mais é que a lib @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.*'],

  // Inserido por mim
  parserOptions: {
    // Define o parser que será utilizado para analisar o código
    parser: '@typescript-eslint/parser',
    // Define o arquivo de configuração do typescript para ser usado pelo ESLint
    project: `${__dirname}/tsconfig.json`
  },

  // Do vite
  // parser: '@typescript-eslint/parser',

  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    
    // Inserido por mim
    // desabilita a config do eslint onde ele dita que so pode usar ou interface ou type
    "@typescript-eslint/consistent-type-definitions": "off",
    // ele não deixa fazer comparação que não seja booleana
    "@typescript-eslint/strict-boolean-expressions": "off",
    // error Definition for rule '@typescript-eslint/camelcase' was not found @typescript-eslint/camelcase
    "@typescript-eslint/camelcase": "off",
  },
}
