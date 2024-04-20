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
  const { setIsLoading, isLoading, email, password } = useHookForm()

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    if (!email || !password) {
      return
    }

    if (email === '' || password === '') {
      return
    }

    if (email.length < 3 || password.length < 3) {
      return
    }

    if (!email.includes('@')) {
      return
    }

    if (!email.trim() || !password.trim()) {
      return
    }

    if (isLoading) {
      return
    }

    setIsLoading()
    await authentication.auth({ email, password })
  }
  return <FormDefault {...props} onSubmit={handleFormSubmit} />
}
