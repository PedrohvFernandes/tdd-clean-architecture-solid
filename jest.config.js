module.exports = {
  // Diretório raiz dos arquivos de teste, logo o rootDir é a pasta src, se não colocar, o rootDir é a pasta raiz do projeto
  // rootDir: './src',
  // roots: ['<rootDir>'],
  roots: ['<rootDir>/src'],
  // Quando não quero fazer o coverage de algum arquivo, eu coloco o caminho do arquivo dentro do array com ! nesse caso não quero fazer o coverage de arquivos de types
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    // '!<rootDir>/presentation/components/router/**/*',
    // '!<rootDir>/presentation/**/router.tsx',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/config/**/*',
    '!**/*.d.ts'
  ],
  // testEnvironment: 'node',
  testEnvironment: 'jsdom',
  // Diretório onde os testes estão localizados
  coverageDirectory: 'coverage',
  // Antes de rodar os testes, ele aplica esse ts-jest em todos os arquivos que terminam com .ts ou .tsx, convertendo para js
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta', // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: { metaObjectReplacement: { url: 'https://www.url.com' } }
            }
          ]
        }
      }
    ]
  },
  moduleNameMapper: {
    // Uma expressão regular, dentro do parentese eu coloco o que eu quero capturar, no caso qualquer carácter, e depois eu coloco o que eu quero substituir, e dentro do $1 eu coloco o que eu capturei dentro do parentese, ou seja, eu troco tudo que vier depois de @/ por <rootDir>/$1
    // '^@/(.*)$': '<rootDir>/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@/data/(.*)$': '<rootDir>/src/data/$1',
    '^@/domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/main/(.*)$': '<rootDir>/src/main/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/main/hooks/$1',
    '^@/presentation/(.*)$': '<rootDir>/src/main/presentation/$1',
    '^@/components/(.*)$': '<rootDir>/src/main/presentation/components/$1',
    '^@/contexts/(.*)$': '<rootDir>/src/main/presentation/contexts/$1',
    '^@/protocols/(.*)$': '<rootDir>/src/main/protocols/$1',
    '^@/validation/(.*)$': '<rootDir>/src/validation/$1'
  }

  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //   prefix: '<rootDir>/src/'
  // })
}
