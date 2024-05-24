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

  useEffect(() => {
    const errorMessage = validation.validate('name', formData)
    setNameError(errorMessage)
  }, [formData, setNameError, validation])

  useEffect(() => {
    const errorMessage = validation.validate('email', formData)
    setEmailError(errorMessage)
  }, [formData, setEmailError, validation])

  useEffect(() => {
    const errorMessage = validation.validate('password', formData)
    setPasswordError(errorMessage)
  }, [formData, setPasswordError, validation])

  useEffect(() => {
    const errorMessage = validation.validate('passwordConfirmation', formData)

    setPasswordConfirmationError(errorMessage)
  }, [formData, setPasswordConfirmationError, validation])

  return <InputForm {...propsInput} />
}
