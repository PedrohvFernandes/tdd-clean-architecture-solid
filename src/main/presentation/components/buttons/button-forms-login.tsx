import React from 'react'

import { ButtonDefault } from './'

import { useHookErrorState } from '@/main/hooks'

interface IButtonFormsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonFormsLogin({ ...props }: IButtonFormsProps) {
  const { emailError, passwordError } = useHookErrorState()

  return (
    // !! --> Converte para boolean. Ele so vai desativar caso tenha erro no email ou no password
    <ButtonDefault {...props} disabled={!!emailError || !!passwordError}>
      Entrar
    </ButtonDefault>
  )
}
