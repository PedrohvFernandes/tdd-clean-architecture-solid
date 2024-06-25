import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    // Aqui colocamos a URL base da aplicação
    baseUrl: 'http://localhost:3000',
    // Dessa forma não precisamos mais criar um arquivo de plugins para usar um preprocessador para o typescript
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', vitePreprocessor(config))

      // return require('src/main/test/cypress/plugins/index.js')
    },
    // Os arquivos de teste que serão executados
    specPattern: 'src/main/test/cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
    fixturesFolder: false,
    supportFile: false,
    video: false
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    }
  }
})
