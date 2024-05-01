import { Link } from 'react-router-dom'

import { ButtonForms } from '@/components/buttons'
import { FormLogin } from '@/components/form'
import { FormStatus } from '@/components/form-status'
import { InputForm } from '@/components/inputs'

import { ConfigRoute } from '@/config/index'
import { ErrorStateContextProvider } from '@/contexts/form/error-state-context'
import { FormContextProvider } from '@/contexts/form/form-context'
import { Authentication } from '@/domain/usecases'
import { Validation } from '@/protocols/validation'

type IPropsLogin = {
  validation: Validation
  authentication: Authentication
}

export function Login({ validation, authentication }: Readonly<IPropsLogin>) {
  return (
    <FormContextProvider>
      <ErrorStateContextProvider>
        {/* Assim como no input passamos o validation, aqui passamos o authentication que atualmente esta vindo dos testes como um AuthenticationSpy. em Login.spec > <Login validation={validationSpy} authentication={authenticationSpy} /> > <FormLogin/> e do MakeLogin */}
        <FormLogin authentication={authentication}>
          <h2 className="text-primary-DARK text-xl uppercase font-bold tracking-wider">
            Login
          </h2>

          <InputForm
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
            // Esse validation é passado pelo login no login.spec e no proprio login por onde ele é chamado para InputForm, o validate é usado para validar o campo. no Spec para o input testamos com dados falsos em login spec onde testamos o input em si, popularmos com o faker, e no login para o input form que valida realmente os campos do form ao usuario digitar. O validation é basicamente como um zod, yup... so que o componente não fica atrelado a ele, que é passado para o componente(de maneira injetada), e no input é chamado o validate para validar os campos do form
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

          <Link
            to={ConfigRoute.fourDev.signup.path}
            className="text-primary lowercase cursor-pointer hover:underline ease-in-out duration-300 hover:opacity-80"
            data-testid="signup"
          >
            Criar conta
          </Link>
          <FormStatus />
        </FormLogin>
      </ErrorStateContextProvider>
    </FormContextProvider>
  )
}
