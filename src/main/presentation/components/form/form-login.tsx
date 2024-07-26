import React from 'react'
import { useNavigate } from 'react-router-dom'

import { FormDefault } from './'

import { ConfigRoute } from '@/config/index'
import { Authentication, UpdateCurrentAccount } from '@/domain/usecases'
import { useHookErrorState, useHookForm } from '@/main/hooks'

interface IFormLoginProps extends React.HTMLAttributes<HTMLFormElement> {
  authentication: Authentication
  updateCurrentAccount: UpdateCurrentAccount
}

export function FormLogin({
  authentication,
  updateCurrentAccount,
  ...props
}: Readonly<IFormLoginProps>) {
  const { setIsLoading, isLoading, email, password } = useHookForm()
  const { emailError, passwordError, setErrorMessageMain } = useHookErrorState()
  const navigate = useNavigate()

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      // Poderia validar se o email e password estão vazios e ja fazer o return. Mas também podemos ver se tem erro no email e password e retornar
      if (isLoading || emailError || passwordError) {
        return
      }

      setIsLoading()
      const account = await authentication.auth({ email, password })
      // O localstorage não pode ficar aqui, ele faz parte do infra e vira um novo caso de uso no domain, implementado no data e dentro do infra usamos a lib(ex: localStorage...) para armazenar localmente, para não acoplar o projeto com libs externas(como foi feito para o axios remote-authentication) porque se futuramente mudarmos por exemplo para cookies a maneira de salvar os dados isso não fica nada reutilizavel, ou seja, eu teria que mudar em todo componente que tem ele. Isso seria um novo caso de uso porque ele é uma regra de negocio, onde eu salvo o token de acesso localmente.
      // localStorage.setItem('accessToken', account.accessToken)

      // Depois de implementar o saveAccessToken do domain no data, e no infra implementar a interface do data para escolher a lib que vai usar a implementação do data e injetar no componente via login.spec e MakeLogin, podemos usar ele aqui para salvar o token de acesso
      // await saveAccessToken.save(account.accessToken)

      await updateCurrentAccount.save(account)
      navigate(ConfigRoute.fourDev.default.source.path)
    } catch (error) {
      // const e = error as Error
      // setErrorMessageMain(e.message)
      setErrorMessageMain(
        error instanceof Error ? error.message : 'Erro inesperado'
      )
      setIsLoading()
    }
  }
  return (
    <FormDefault {...props} onSubmit={handleFormSubmit} data-testid="form" />
  )
}
