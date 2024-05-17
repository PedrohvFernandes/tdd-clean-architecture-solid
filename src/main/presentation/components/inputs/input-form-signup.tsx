import { InputHTMLAttributes, useEffect } from 'react'

import { InputForm } from './input-form'

import { useHookErrorState, useHookForm } from '@/main/hooks'
import { Validation } from '@/protocols/validation'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  validation: Validation
}

export function InputFormSignUp({ validation, ...propsInput }: InputFormProps) {
  const {
    setNameError,
    setEmailError,
    setPasswordError,
    setPasswordConfirmationError
  } = useHookErrorState()

  const { name, email, password, passwordConfirmation } = useHookForm()

  useEffect(() => {
    const errorMessage = validation.validate('name', name)
    setNameError(errorMessage)
  }, [name, setNameError, validation])

  useEffect(() => {
    setEmailError('Campo obrigatório')
  }, [email, setEmailError])

  useEffect(() => {
    setPasswordError('Campo obrigatório')
  }, [password, setPasswordError])

  useEffect(() => {
    setPasswordConfirmationError('Campo obrigatório')
  }, [passwordConfirmation, setPasswordConfirmationError])

  return <InputForm {...propsInput} />
}
