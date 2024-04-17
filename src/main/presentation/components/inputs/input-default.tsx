import React, { HTMLAttributes, InputHTMLAttributes, useEffect } from 'react'

import { IconBallRed } from '../icon-ball-red'

import { useHookErrorState } from '@/hooks/use-hook-error-state-context'
import { useHookForm } from '@/main/hooks'
import { Validation } from '@/protocols/validation'

interface InputDefaultProps extends InputHTMLAttributes<HTMLInputElement> {
  validation: Validation
}
interface DivDefaultProps extends HTMLAttributes<HTMLDivElement> {}

export function InputDefault(
  { validation, ...props }: InputDefaultProps,
  { ...rest }: DivDefaultProps
) {
  const errorState = useHookErrorState()
  // Pegamos o erro de acordo com o nome do input. o as keyof typeof valueContext é para tipar o erro
  const error = errorState[`${props.name}` as keyof typeof errorState]

  const { setEmail, email } = useHookForm()

  useEffect(() => {
    validation.validate({ email })
  }, [email, validation])

  const getStatus = (): string => {
    if (error) {
      return '🔴'
    }
    return ''
  }

  const getTitle = (): string => {
    if (error) {
      return error as string
    }
    return ''
  }

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
        onChange={(e) => setEmail(e.target.value)}
        className="border border-primary-LIGHT p-5 rounded focus:outline-primary-LIGHT focus:ring-2 ring-primary-DARK flex-1"
        data-testid={props.name}
      />

      <IconBallRed title={getTitle()} data-testid={`${props.name}-status`}>
        {getStatus()}
      </IconBallRed>
    </div>
  )
}
