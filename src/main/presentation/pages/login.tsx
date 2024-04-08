import { FormStatus } from '@/components/form-status'
import { InputDefault } from '@/components/inputs'

export function Login() {
  return (
    <form className="flex flex-col gap-4 w-[400px] bg-white p-10 rounded-lg self-center text-center shadow">
      <h2 className="text-primary-DARK text-xl uppercase font-bold tracking-wider">
        Login
      </h2>

      <InputDefault
        type="email"
        name="email"
        id="email"
        placeholder="Digite seu email"
      />

      <InputDefault
        type="password"
        name="password"
        id="password"
        placeholder="Digite seu password"
      />

      <button
        type="submit"
        className="bg-primary text-white rounded-lg border-none p-4 hover:opacity-90"
      >
        Entrar
      </button>

      <a className="text-primary lowercase cursor-pointer hover:underline ease-in-out duration-300 hover:opacity-80">
        Criar conta
      </a>
      <FormStatus />
    </form>
  )
}
