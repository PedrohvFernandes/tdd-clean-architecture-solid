import React from 'react'
import { useNavigate } from 'react-router-dom'

import { FormDefault } from './'

import { ConfigRoute } from '@/config/index'
import { AddAccount, UpdateCurrentAccount } from '@/domain/usecases'
import { useHookErrorState, useHookForm } from '@/main/hooks'

interface IFormSignUpProps extends React.HTMLAttributes<HTMLFormElement> {
  addAccount: AddAccount
  updateCurrentAccount: UpdateCurrentAccount
}

export function FormSignUp({
  addAccount,
  updateCurrentAccount,
  ...rest
}: IFormSignUpProps) {
  const {
    setIsLoading,
    isLoading,
    name,
    password,
    email,
    passwordConfirmation
  } = useHookForm()

  const { isFormInvalid, setErrorMessageMain } = useHookErrorState()

  const navigate = useNavigate()

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (isLoading || isFormInvalid) {
        return
      }

      setIsLoading()
      const account = await addAccount.add({
        name,
        email,
        password,
        passwordConfirmation
      })
      await updateCurrentAccount.save(account)
      navigate(ConfigRoute.fourDev.default.source.path)
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
