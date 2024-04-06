import { Footer } from '@/components/footer'
import { LoginHeader } from '@/components/headers'
import { Ellipsis } from '@/components/loadings'

export function Login() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <LoginHeader />
      <form className="flex flex-col gap-4 w-[400px] bg-white p-10 rounded-lg self-center text-center shadow">
        <h2 className="text-primary-DARK text-xl uppercase font-bold tracking-wider">
          Login
        </h2>
        <div className="flex items-center relative">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
            className="border border-primary-LIGHT p-5 rounded focus:outline-primary-LIGHT focus:ring-2 ring-primary-DARK flex-1"
          />
          <span className="absolute right-2 cursor-help hover:animate-bounce">
            🔴
          </span>
        </div>
        <div className="flex relative items-center">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite seu password"
            className="border border-primary-LIGHT p-5 rounded focus:outline-primary-LIGHT focus:ring-2 ring-primary-DARK flex-1"
          />
          <span className="absolute right-2 cursor-help hover:animate-bounce">
            🔴
          </span>
        </div>
        <button
          type="submit"
          className="bg-primary text-white rounded-lg border-none p-4 hover:opacity-90"
        >
          Entrar
        </button>
        <a className="text-primary lowercase cursor-pointer hover:underline ease-in-out duration-300 hover:opacity-80">
          Criar conta
        </a>
        <div className="flex flex-col items-center gap-4">
          <Ellipsis />
          <span className="text-primary-LIGHT font-bold uppercase tracking-wider">
            Error
          </span>
        </div>
      </form>
      <Footer />
    </div>
  )
}
