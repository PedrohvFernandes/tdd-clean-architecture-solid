// import { Link } from 'react-router-dom'

import { ButtonFormsSignUp } from '@/components/buttons'
import { FormSignUp } from '@/components/form'
import { FormStatus } from '@/components/form-status'
import { InputFormSignUp } from '@/components/inputs'

// import { ConfigRoute } from '@/config/index'
import { ErrorStateContextProvider } from '@/contexts/form/error-state-context'
import { FormContextProvider } from '@/contexts/form/form-context'

export function SignUp() {
  return (
    <FormContextProvider>
      <ErrorStateContextProvider>
        <FormSignUp>
          <h2 className="text-primary-DARK text-xl uppercase font-bold tracking-wider">
            Criar conta
          </h2>

          <InputFormSignUp
            type="text"
            name="name"
            id="name"
            placeholder="Digite seu nome"
          />

          <InputFormSignUp
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
          />

          <InputFormSignUp
            type="password"
            name="password"
            id="password"
            placeholder="Digite seu password"
          />

          <InputFormSignUp
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="Repita sua senha"
          />

          <ButtonFormsSignUp type="submit" name="submit" />

          <span
            // to={ConfigRoute.fourDev.login.path}
            className="text-primary lowercase cursor-pointer hover:underline ease-in-out duration-300 hover:opacity-80"
            data-testid="signup"
          >
            Já tem uma conta? Faça login
          </span>
          <FormStatus />
        </FormSignUp>
      </ErrorStateContextProvider>
    </FormContextProvider>
  )
}
