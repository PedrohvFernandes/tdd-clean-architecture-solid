import React, { HTMLAttributes, InputHTMLAttributes } from 'react'

import { IconBallRed } from '../icon-ball-red'

interface InputDefaultProps extends InputHTMLAttributes<HTMLInputElement> {}
interface DivDefaultProps extends HTMLAttributes<HTMLDivElement> {}

export function InputDefault(
  props: InputDefaultProps,
  { ...rest }: DivDefaultProps
) {
  // A gente desativa a questão de readOnly para que o usuário possa digitar
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }
  return (
    <div {...rest} className="flex items-center relative">
      <input
        // readOnly para desativar a sugestão do google chrome, so que ele impede do usuario digitar
        readOnly
        onFocus={enableInput}
        {...props}
        className="border border-primary-LIGHT p-5 rounded focus:outline-primary-LIGHT focus:ring-2 ring-primary-DARK flex-1"
      />

      <IconBallRed />
    </div>
  )
}
