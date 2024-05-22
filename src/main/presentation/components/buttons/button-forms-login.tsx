import React from 'react'

import { ButtonDefault } from './'

interface IButtonFormsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonFormsLogin({ ...props }: IButtonFormsProps) {
  return (
    // !! --> Converte para boolean. Ele so vai desativar caso tenha erro no email ou no password
    <ButtonDefault {...props}>Entrar</ButtonDefault>
  )
}
