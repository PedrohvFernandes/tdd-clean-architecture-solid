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

  const formData = useHookForm()

  const { email, password, name, passwordConfirmation } = formData

  useEffect(() => {
    const errorMessage = validation.validate('name', formData)
    setNameError(errorMessage)
  }, [name])

  useEffect(() => {
    const errorMessage = validation.validate('email', formData)
    setEmailError(errorMessage)
  }, [email])

  useEffect(() => {
    const errorMessage = validation.validate('password', formData)
    setPasswordError(errorMessage)
  }, [password])

  useEffect(() => {
    const errorMessage = validation.validate('passwordConfirmation', formData)
    setPasswordConfirmationError(errorMessage)
  }, [passwordConfirmation])

  return <InputForm {...propsInput} />
}
