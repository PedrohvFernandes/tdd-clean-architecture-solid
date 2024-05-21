import React from 'react'

import { FormDefault } from './'

import { AddAccount } from '@/domain/usecases'
import { useHookErrorState, useHookForm } from '@/main/hooks'

interface IFormSignUpProps extends React.HTMLAttributes<HTMLFormElement> {
  addAccount: AddAccount
}

export function FormSignUp({ addAccount, ...rest }: IFormSignUpProps) {
  const {
    setIsLoading,
    isLoading,
    name,
    password,
    email,
    passwordConfirmation
  } = useHookForm()

  const {
    nameError,
    emailError,
    passwordError,
    passwordConfirmationError,
    setErrorMessageMain
  } = useHookErrorState()

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (
        isLoading ||
        nameError ||
        emailError ||
        passwordError ||
        passwordConfirmationError
      ) {
        return
      }

      setIsLoading()
      await addAccount.add({
        name,
        email,
        password,
        passwordConfirmation
      })
    } catch (error) {
      setErrorMessageMain(
        error instanceof Error ? error.message : 'Erro inesperado'
      )
      setIsLoading()
    }
  }
  return (
    <FormDefault {...rest} data-testid="form" onSubmit={handleFormSubmit} />
  )
}
