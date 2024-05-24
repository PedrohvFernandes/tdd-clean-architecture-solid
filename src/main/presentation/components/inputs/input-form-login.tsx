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

  const formData = useHookForm()

  useEffect(() => {
    // Usamos o validation passado pelo login para validar o campo. o ValidationSpy é passado pelo teste login.spec e o validation implementado pelo MakeLogin em factories para o InputFormLogin que valida os campos do schema definido para o composite em factories passado para o login. Atraves desse schema passado para o composite com os respectivos nomes dos fields(campos) conseguimos validar usando o validate do validation que é justamente o composite. Por isso mesmo nome colocado do field aqui tem que ser o mesmo colocado no make do composite em facotires.
    const errorMessage = validation.validate('email', formData)
    setEmailError(errorMessage)
  }, [formData, setEmailError, validation])

  useEffect(() => {
    const errorMessage = validation.validate('password', formData)
    setPasswordError(errorMessage)
  }, [formData, setPasswordError, validation])

  return <InputForm {...propsInput} />
}
