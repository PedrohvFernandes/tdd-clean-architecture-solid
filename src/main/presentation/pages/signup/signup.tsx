import { Link } from 'react-router-dom'

import { ButtonFormsSignUp } from '@/components/buttons'
import { FormSignUp } from '@/components/form'
import { FormStatus } from '@/components/form-status'
import { InputFormSignUp } from '@/components/inputs'

import { ConfigRoute } from '@/config/index'
import { ErrorStateContextProvider } from '@/contexts/form/error-state-context'
import { FormContextProvider } from '@/contexts/form/form-context'
import { AddAccount, UpdateCurrentAccount } from '@/domain/usecases'
import { Validation } from '@/protocols/validation'

type IPropsLogin = {
  validation: Validation
  addAccount: AddAccount
  updateCurrentAccount: UpdateCurrentAccount
}

export function SignUp({
  validation,
  addAccount,
  updateCurrentAccount
}: IPropsLogin) {
  return (
    <FormContextProvider>
      <ErrorStateContextProvider>
        <FormSignUp
          addAccount={addAccount}
          updateCurrentAccount={updateCurrentAccount}
        >
          <h2 className="text-primary-DARK text-xl uppercase font-bold tracking-wider">
            Criar conta
          </h2>

          <InputFormSignUp
            type="text"
            name="name"
            id="name"
            placeholder="Digite seu nome"
            validation={validation}
          />

          <InputFormSignUp
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
            validation={validation}
          />

          <InputFormSignUp
            type="password"
            name="password"
            id="password"
            placeholder="Digite seu password"
            validation={validation}
          />

          <InputFormSignUp
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="Repita sua senha"
            validation={validation}
          />

          <ButtonFormsSignUp type="submit" name="submit" />

          <Link
            // replace
            to={ConfigRoute.fourDev.login.path}
            className="text-primary lowercase cursor-pointer hover:underline ease-in-out duration-300 hover:opacity-80"
            data-testid="login-link"
          >
            Já tem uma conta? Faça login
          </Link>
          <FormStatus />
        </FormSignUp>
      </ErrorStateContextProvider>
    </FormContextProvider>
  )
}
