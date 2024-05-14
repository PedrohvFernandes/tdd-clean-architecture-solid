import { HTMLAttributes, InputHTMLAttributes } from 'react'

import { IconBall } from '../icon-ball'
import { InputDefault } from './'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {}
interface DivDefaultProps extends HTMLAttributes<HTMLDivElement> {}

export function InputFormSignUp(
  { ...propsInput }: InputFormProps,
  { ...restDiv }: DivDefaultProps
) {
  return (
    <div {...restDiv} className="flex items-center relative">
      <InputDefault {...propsInput} />

      <IconBall data-testid={`${propsInput.name}-status`}>🟢</IconBall>
    </div>
  )
}
