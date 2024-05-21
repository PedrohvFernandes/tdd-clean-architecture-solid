import React from 'react'
import { useNavigate } from 'react-router-dom'

import { FormDefault } from './'

import { ConfigRoute } from '@/config/index'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { useHookErrorState, useHookForm } from '@/main/hooks'

interface IFormSignUpProps extends React.HTMLAttributes<HTMLFormElement> {
  addAccount: AddAccount
  saveAccessTokenMock: SaveAccessToken
}

export function FormSignUp({
  addAccount,
  saveAccessTokenMock,
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

  const {
    nameError,
    emailError,
    passwordError,
    passwordConfirmationError,
    setErrorMessageMain
  } = useHookErrorState()

  const navigate = useNavigate()

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
      const accessToken = await addAccount.add({
        name,
        email,
        password,
        passwordConfirmation
      })
      saveAccessTokenMock.save(accessToken.accessToken)
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
