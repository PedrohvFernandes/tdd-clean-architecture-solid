import React from 'react'

import { FormDefault } from './'

import { Authentication } from '@/domain/usecases'
import { useHookErrorState, useHookForm } from '@/main/hooks'

interface IFormLoginProps extends React.HTMLAttributes<HTMLFormElement> {
  authentication: Authentication
}

export function FormLogin({
  authentication,
  ...props
}: Readonly<IFormLoginProps>) {
  const { setIsLoading, isLoading, email, password } = useHookForm()
  const { emailError, passwordError } = useHookErrorState()

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    // Poderia validar se o email e password estão vazios e ja fazer o return. Mas também podemos ver se tem erro no email e password e retornar
    if (isLoading || emailError || passwordError) {
      return
    }

    setIsLoading()
    await authentication.auth({ email, password })
  }
  return (
    <FormDefault {...props} onSubmit={handleFormSubmit} data-testid="form" />
  )
}
