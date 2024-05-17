import { InputHTMLAttributes, useEffect } from 'react'

import { InputForm } from './input-form'

import { useHookErrorState, useHookForm } from '@/main/hooks'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {}

export function InputFormSignUp({ ...propsInput }: InputFormProps) {
  const {
    setNameError,
    setEmailError,
    setPasswordError,
    setPasswordConfirmationError
  } = useHookErrorState()

  const { name, email, password, passwordConfirmation } = useHookForm()

  useEffect(() => {
    setNameError('Campo obrigatório')
  }, [name, setNameError])

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
