import { HTMLAttributes, InputHTMLAttributes, useEffect } from 'react'

import { IconBall } from '../icon-ball'
import { InputDefault } from './'

import { useHookErrorState } from '@/hooks/use-hook-error-state-context'
import { useHookForm } from '@/main/hooks'
import { Validation } from '@/protocols/validation'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  validation: Validation
}
interface DivDefaultProps extends HTMLAttributes<HTMLDivElement> {}

export function InputForm(
  { validation, ...propsInput }: InputFormProps,
  { ...restDiv }: DivDefaultProps
) {
  const errorState = useHookErrorState()
  const { setEmailError, setPasswordError } = useHookErrorState()
  // Pegamos o erro de acordo com o nome do input. o as keyof typeof valueContext é para tipar o erro
  const error = errorState[`${propsInput.name}Error` as keyof typeof errorState]

  const { email, password, handleChange } = useHookForm()

  useEffect(() => {
    // Usamos o validation passado pelo login para validar o campo. o ValidationSpy é passado pelo teste login.spec. Com isso deixamos o validation como --> ? porque é somente para teste, mas como o ValidationSpy é passado do login para o input, logo caso eu inicie a aplicação no modo dev ele vai entender que o validation não tem um validate, porque no login em si ele não é passado, mas somente o type e pelo spec passamos o ValidationSpy pelo factory makeSut para o login onde o ValidationSpy implementa o Validation que contem o validate. E do login vai para o input
    const errorMessage = validation.validate('email', email)
    setEmailError(errorMessage)
  }, [email, setEmailError, validation])

  useEffect(() => {
    const errorMessage = validation.validate('password', password)
    setPasswordError(errorMessage)
  }, [password, setPasswordError, validation])

  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    return error ? (error as string) : 'Tudo Certo!'
  }

  return (
    <div {...restDiv} className="flex items-center relative">
      <InputDefault {...propsInput} onChange={handleChange} />

      <IconBall title={getTitle()} data-testid={`${propsInput.name}-status`}>
        {getStatus()}
      </IconBall>
    </div>
  )
}
