import React from 'react'

import { ButtonDefault } from './'

interface IButtonFormsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonFormsSignUp({ ...props }: IButtonFormsProps) {
  return (
    // !! --> Converte para boolean. Ele so vai desativar caso tenha erro no email ou no password ou qualquer outro campo
    <ButtonDefault {...props}>Cadastrar</ButtonDefault>
  )
}
