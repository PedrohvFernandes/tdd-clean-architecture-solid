module.exports = {
  // Diretório raiz dos arquivos de teste
  rootDir: './src',
  // roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  testEnvironment: 'node',
  // Diretório onde os testes estão localizados
  coverageDirectory: 'coverage',
  // Antes de rodar os testes, ele aplica esse ts-jest em todos os arquivos que terminam com .ts ou .tsx, convertendo para js
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    // Uma expressão regular, dentro do parentese eu coloco o que eu quero capturar, no caso qualquer carácter, e depois eu coloco o que eu quero substituir, e dentro do $1 eu coloco o que eu capturei dentro do parentese, ou seja, eu troco tudo que vier depois de @/ por <rootDir>/$1
    '@/(.*)': '<rootDir>/$1'
  }
}
