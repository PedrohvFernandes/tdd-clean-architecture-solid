import React from 'react'

import { FormDefault } from './'

import { Authentication } from '@/domain/usecases'
import { useHookForm } from '@/main/hooks'

interface IFormLoginProps extends React.HTMLAttributes<HTMLFormElement> {
  authentication: Authentication
}

export function FormLogin({
  authentication,
  ...props
}: Readonly<IFormLoginProps>) {
  const { setIsLoading, email, password } = useHookForm()

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    setIsLoading()
    await authentication.auth({ email, password })
  }
  return <FormDefault {...props} onSubmit={handleFormSubmit} />
}
