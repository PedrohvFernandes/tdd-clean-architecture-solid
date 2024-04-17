import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Colocando uma porta mais facil de lembrar
    port: 3000
  },
  // O preview nada mais é que uma instancia, tipo um node server que roda o build de uma aplicação so pra você ver como a aplicação esta rodando quando ela tiver em build
  preview: {
    // Pode deixar a mesma porta do server
    port: 3000
  },
  resolve: {
    // O alias serve para criar um atalho para um caminho
    alias: {
      // O @ é um atalho para a pasta src
      '@/assets': path.resolve('./src/assets'),
      '@/infra': path.resolve('./src/main/infra'),
      '@/data': path.resolve('./src/main/data'),
      '@/domain': path.resolve('./src/main/domain'),
      '@/main': path.resolve('./src/main'),
      '@/hooks': path.resolve('./src/main/hooks'),
      '@/presentation': path.resolve('./src/main/presentation'),
      '@/components': path.resolve('./src/main/presentation/components'),
      '@/contexts': path.resolve('./src/main/presentation/contexts'),
      '@/layouts': path.resolve('./src/main/presentation/layouts'),
      '@/pages': path.resolve('./src/main/presentation/pages'),
      '@/protocols': path.resolve('./src/main/presentation/protocols')
    }
  }
})
