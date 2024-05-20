import React from 'react'

import { FormDefault } from './'

import { AddAccount } from '@/domain/usecases'
import { useHookForm } from '@/main/hooks'

interface IFormSignUpProps extends React.HTMLAttributes<HTMLFormElement> {
  addAccount: AddAccount
}

export function FormSignUp({ addAccount, ...rest }: IFormSignUpProps) {
  const { setIsLoading, name, password, email, passwordConfirmation } =
    useHookForm()

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    setIsLoading()
    await addAccount.add({
      name,
      email,
      password,
      passwordConfirmation
    })
  }
  return (
    <FormDefault {...rest} data-testid="form" onSubmit={handleFormSubmit} />
  )
}
