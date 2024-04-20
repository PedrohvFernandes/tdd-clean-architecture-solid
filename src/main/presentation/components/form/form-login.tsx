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
  const { emailError, passwordError, setErrorMessageMain } = useHookErrorState()

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      // Poderia validar se o email e password estão vazios e ja fazer o return. Mas também podemos ver se tem erro no email e password e retornar
      if (isLoading || emailError || passwordError) {
        return
      }

      setIsLoading()
      await authentication.auth({ email, password })
    } catch (error) {
      setIsLoading()
      setErrorMessageMain(
        error instanceof Error ? error.message : 'Erro inesperado'
      )
    }
  }
  return (
    <FormDefault {...props} onSubmit={handleFormSubmit} data-testid="form" />
  )
}
