import React, { InputHTMLAttributes, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

interface IPInputDefaultProps extends InputHTMLAttributes<HTMLInputElement> {}

export const InputDefault = forwardRef<HTMLInputElement, IPInputDefaultProps>(
  function InputDefault({ className, ...props }, ref) {
    return (
      <input
        {...props}
        ref={ref}
        // readOnly para desativar a sugestão do google chrome, so que ele impede do usuario digitar
        readOnly
        data-testid={props.name ? props.name : 'input-default'}
        // A gente desativa a questão de readOnly para que o usuário possa digitar
        onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
          event.target.readOnly = false
        }}
        className={twMerge(
          'border-none outline-none pl-2 pr-10 py-1 rounded w-full',
          className
        )}
      />
    )
  }
)
