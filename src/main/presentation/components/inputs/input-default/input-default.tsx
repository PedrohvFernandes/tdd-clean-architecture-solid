import React, { InputHTMLAttributes } from 'react'

interface InputDefaultProps extends InputHTMLAttributes<HTMLInputElement> {}

export function InputDefault({ ...props }: InputDefaultProps) {
  // A gente desativa a questão de readOnly para que o usuário possa digitar
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  return (
    <input
      {...props}
      // readOnly para desativar a sugestão do google chrome, so que ele impede do usuario digitar
      readOnly
      data-testid={props.name ? props.name : 'input-default'}
      onFocus={enableInput}
      className="border border-primary-LIGHT p-5 rounded focus:outline-primary-LIGHT focus:ring-2 ring-primary-DARK flex-1"
    />
  )
}
