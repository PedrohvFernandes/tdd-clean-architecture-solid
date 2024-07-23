/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F2F2F2',
        primary: {
          // Eu coloquei o var dentro de RGB porque o valor da variavel de cor vindo no index.css é um RGB, se fosse um HEX eu colocaria o var fora do RGB, ou seja, passava direto: DEFAULT: '(var(--primary-default-rgb)' e obvio que se não tivesse uma variavel do css eu passaria o HEX direto, fora do var: DEFAULT: #880E4F,
          DEFAULT: 'rgb(var(--primary-default-rgb))',
          DARK: 'rgb(var(--primary-dark-rgb))',
          LIGHT: 'rgb(var(--primary-light-rgb))'
        },
        valid: {
          DEFAULT: '#4CAF50',
          DARK: '#087f23',
          LIGHT: '#8BC34A'
        },
        invalid: {
          DEFAULT: '#EF5350',
          DARK: '#B71C1C',
          LIGHT: '#FFCDD2'
        },
        disabled: {
          background: '#CCC',
          text: '#666'
        }
      },
      keyframes: {
        ldsEllipsis1: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        ldsEllipsis2: {
          '0%': {
            transform: 'translate(0, 0)'
          },
          '100%': {
            transform: 'translate(24px, 0)'
          }
        },
        ldsEllipsis3: {
          '0%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(0)'
          }
        }
      },
      animation: {
        ldsEllipsis1: 'ldsEllipsis1 0.6s infinite',
        ldsEllipsis2: 'ldsEllipsis2 0.6s infinite',
        ldsEllipsis3: 'ldsEllipsis3 0.6s infinite'
      },
      boxShadow: {
        shape:
          '0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)'
      },
      backgroundImage: {
        // Definição: Isso define uma imagem de fundo que é um gradiente linear.
        // Descrição: A imagem de fundo consiste em dois gradientes lineares:
        // O primeiro gradiente vai da esquerda para a direita (to right) e usa rgba(var(--primary-light-rgb), 0.1) para definir a cor com opacidade de 0.1.
        // O segundo gradiente também vai da esquerda para a direita e usa a variável var(--white) para definir a cor branca sem opacidade.
        'gradiente-to-right-primary-light':
          'linear-gradient(to right, rgba(var(--primary-light-rgb), 0.1), rgba(var(--primary-light-rgb), 0.1)), linear-gradient(to right, var(--white), var(--white))'
      },
      // Definição: Isso define o tamanho das imagens de fundo ou gradiente.
      backgroundSize: {
        'size-58px': '58px'
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif']
    }
  },
  plugins: []
}
