/* eslint-disable react-hooks/rules-of-hooks */

import { useLogout } from './use-logout'

import { AccessDeniedError } from '@/domain/errors'

type CallBackType = (error: Error) => void

type ResultType = {
  onError: (error: Error) => void
}

// Isso aqui é o que chamamos de programação funcional, diferente da programação orientada a objetos, aqui passamos uma função como parâmetro para outra função, isso é muito comum em programação funcional.

// Callback é a função que será chamada quando ocorrer um erro, cada lugar tem sua própria função de callback, com isso deixamos algo generico aqui.
// A função useErroHandler devolve uma função que recebe um erro e verifica se o erro é do tipo AccessDeniedError, se for ele redireciona para a página de login, caso contrário ele chama a função de callback passada por parâmetro.
export const useErrorHandler = (callback: CallBackType): ResultType => {
  const { logout } = useLogout()
  return {
    onError: (error: Error) => {
      if (error instanceof AccessDeniedError) {
        logout()
        return
      }
      callback(error)
    }
  }
}
