import React, { HTMLAttributes, InputHTMLAttributes, useEffect } from 'react'

import { IconBall } from '../icon-ball'

import { useHookErrorState } from '@/hooks/use-hook-error-state-context'
import { useHookForm } from '@/main/hooks'
import { Validation } from '@/protocols/validation'

interface InputDefaultProps extends InputHTMLAttributes<HTMLInputElement> {
  validation?: Validation
}
interface DivDefaultProps extends HTMLAttributes<HTMLDivElement> {}

export function InputDefault(
  { validation, ...props }: InputDefaultProps,
  { ...rest }: DivDefaultProps
) {
  const errorState = useHookErrorState()
  const { setEmailError, setPasswordError } = useHookErrorState()
  // Pegamos o erro de acordo com o nome do input. o as keyof typeof valueContext é para tipar o erro
  const error = errorState[`${props.name}Error` as keyof typeof errorState]

  const { email, password, handleChange } = useHookForm()

  useEffect(() => {
    // Usamos o validation passado pelo login para validar o campo. o ValidationSpy é passado pelo teste login.spec. Com isso deixamos o validation como --> ? porque é somente para teste, mas como o ValidationSpy é passado do login para o input, logo caso eu inicie a aplicação no modo dev ele vai entender que o validation não tem um validate, porque no login em si ele não é passado, mas somente o type e pelo spec passamos o ValidationSpy pelo factory makeSut para o login onde o ValidationSpy implementa o Validation que contem o validate. E do login vai para o input
    const errorMessage = validation?.validate('email', email) as string
    setEmailError(errorMessage)
  }, [email, setEmailError, validation])

  useEffect(() => {
    const errorMessage = validation?.validate('password', password) as string
    setPasswordError(errorMessage)
  }, [password, setPasswordError, validation])

  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    return error ? (error as string) : 'Tudo Certo!'
  }

  // A gente desativa a questão de readOnly para que o usuário possa digitar
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }
  return (
    <div {...rest} className="flex items-center relative">
      <input
        // readOnly para desativar a sugestão do google chrome, so que ele impede do usuario digitar
        readOnly
        onFocus={enableInput}
        {...props}
        onChange={handleChange}
        className="border border-primary-LIGHT p-5 rounded focus:outline-primary-LIGHT focus:ring-2 ring-primary-DARK flex-1"
        data-testid={props.name}
      />

      <IconBall title={getTitle()} data-testid={`${props.name}-status`}>
        {getStatus()}
      </IconBall>
    </div>
  )
}
