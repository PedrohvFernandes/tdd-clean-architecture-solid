import React from 'react'

import { FormDefault } from './'

import { useHookForm } from '@/main/hooks'

interface IFormSignUpProps extends React.HTMLAttributes<HTMLFormElement> {}

export function FormSignUp({ ...rest }: IFormSignUpProps) {
  const { setIsLoading } = useHookForm()

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    setIsLoading()
  }
  return (
    <FormDefault {...rest} data-testid="form" onSubmit={handleFormSubmit} />
  )
}
