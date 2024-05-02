module.exports = {
  // Diretório raiz dos arquivos de teste
  rootDir: './src',
  // roots: ['<rootDir>/src'],
  // Quando não quero fazer o coverage de algum arquivo, eu coloco o caminho do arquivo dentro do array com ! nesse caso não quero fazer o coverage de arquivos de types
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/*',
    '!**/*.d.ts'
  ],
  // testEnvironment: 'node',
  testEnvironment: 'jsdom',
  // Diretório onde os testes estão localizados
  coverageDirectory: 'coverage',
  // Antes de rodar os testes, ele aplica esse ts-jest em todos os arquivos que terminam com .ts ou .tsx, convertendo para js
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    // Uma expressão regular, dentro do parentese eu coloco o que eu quero capturar, no caso qualquer carácter, e depois eu coloco o que eu quero substituir, e dentro do $1 eu coloco o que eu capturei dentro do parentese, ou seja, eu troco tudo que vier depois de @/ por <rootDir>/$1
    // '^@/(.*)$': '<rootDir>/$1',
    '^@/config/(.*)$': '<rootDir>/config/$1',
    '^@/infra/(.*)$': '<rootDir>/infra/$1',
    '^@/data/(.*)$': '<rootDir>/data/$1',
    '^@/domain/(.*)$': '<rootDir>/domain/$1',
    '^@/main/(.*)$': '<rootDir>/main/$1',
    '^@/hooks/(.*)$': '<rootDir>/main/hooks/$1',
    '^@/presentation/(.*)$': '<rootDir>/main/presentation/$1',
    '^@/components/(.*)$': '<rootDir>/main/presentation/components/$1',
    '^@/contexts/(.*)$': '<rootDir>/main/presentation/contexts/$1',
    '^@/protocols/(.*)$': '<rootDir>/main/protocols/$1',
    '^@/validation/(.*)$': '<rootDir>/validation/$1'
  }

  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //   prefix: '<rootDir>/src/'
  // })
}
