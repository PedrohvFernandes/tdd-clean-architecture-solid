import React from 'react'

import { FormDefault } from './'

import { useHookForm } from '@/main/hooks'

interface IFormLoginProps extends React.HTMLAttributes<HTMLFormElement> {}

export function FormLogin({ ...props }: IFormLoginProps) {
  const { isLoading, setIsLoading } = useHookForm()

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading()
    console.log('FormLogin', isLoading)
  }
  return <FormDefault {...props} onSubmit={handleFormSubmit} />
}
