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
      const accessToken = await addAccount.add({
        name,
        email,
        password,
        passwordConfirmation
      })
      await saveAccessTokenMock.save(accessToken.accessToken)
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
