import { ButtonForms } from '@/components/buttons'
import { FormStatus } from '@/components/form-status'
import { InputForm } from '@/components/inputs'

import { ErrorStateContextProvider } from '@/contexts/form/error-state-context'
import { FormContextProvider } from '@/contexts/form/form-context'
import { Validation } from '@/protocols/validation'

type IPropsLogin = {
  validation: Validation
}

export function Login({ validation }: Readonly<IPropsLogin>) {
  return (
    <FormContextProvider>
      <ErrorStateContextProvider>
        <form className="flex flex-col gap-4 w-[400px] bg-white p-10 rounded-lg self-center text-center shadow">
          <h2 className="text-primary-DARK text-xl uppercase font-bold tracking-wider">
            Login
          </h2>

          <InputForm
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
            // Esse validation é passado pelo login.spec e no input default ele é usado para validar o campo
            validation={validation}
          />

          <InputForm
            type="password"
            name="password"
            id="password"
            placeholder="Digite seu password"
            validation={validation}
          />

          <ButtonForms type="submit" name="submit" />

          <a className="text-primary lowercase cursor-pointer hover:underline ease-in-out duration-300 hover:opacity-80">
            Criar conta
          </a>
          <FormStatus />
        </form>
      </ErrorStateContextProvider>
    </FormContextProvider>
  )
}
