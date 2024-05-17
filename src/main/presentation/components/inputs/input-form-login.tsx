import { InputHTMLAttributes, useEffect } from 'react'

import { InputForm } from './input-form'

import { useHookErrorState } from '@/hooks/use-hook-error-state-context'
import { useHookForm } from '@/main/hooks'
import { Validation } from '@/protocols/validation'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  validation: Validation
}

export function InputFormLogin({ validation, ...propsInput }: InputFormProps) {
  const { setEmailError, setPasswordError } = useHookErrorState()

  const { email, password } = useHookForm()

  useEffect(() => {
    // Usamos o validation passado pelo login para validar o campo. o ValidationSpy é passado pelo teste login.spec. Com isso deixamos o validation como --> ? porque é somente para teste, mas como o ValidationSpy é passado do login para o input, logo caso eu inicie a aplicação no modo dev ele vai entender que o validation não tem um validate, porque no login em si ele não é passado, mas somente o type e pelo spec passamos o ValidationSpy pelo factory makeSut para o login onde o ValidationSpy implementa o Validation que contem o validate. E do login vai para o input
    const errorMessage = validation.validate('email', email)
    setEmailError(errorMessage)
  }, [email, setEmailError, validation])

  useEffect(() => {
    const errorMessage = validation.validate('password', password)
    setPasswordError(errorMessage)
  }, [password, setPasswordError, validation])

  return <InputForm {...propsInput} />
}
