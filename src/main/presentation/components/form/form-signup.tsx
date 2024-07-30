import React from 'react'
import { useNavigate } from 'react-router-dom'

import { FormDefault } from './'

import { ConfigRoute } from '@/config/index'
import { AddAccount } from '@/domain/usecases'
import { useHookErrorState, useHookForm } from '@/main/hooks'
import { useHookApi } from '@/main/hooks/use-hook-api-context'

interface IFormSignUpProps extends React.HTMLAttributes<HTMLFormElement> {
  addAccount: AddAccount
}

export function FormSignUp({ addAccount, ...rest }: IFormSignUpProps) {
  const { setCurrentAccount } = useHookApi()

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
      setCurrentAccount(account)
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
