import { HTMLAttributes, InputHTMLAttributes } from 'react'

import { IconBallRed } from '../icon-ball-red'

interface InputDefaultProps extends InputHTMLAttributes<HTMLInputElement> {}
interface DivDefaultProps extends HTMLAttributes<HTMLDivElement> {}

export function InputDefault(
  props: InputDefaultProps,
  { ...rest }: DivDefaultProps
) {
  return (
    <div {...rest} className="flex items-center relative">
      <input
        {...props}
        className="border border-primary-LIGHT p-5 rounded focus:outline-primary-LIGHT focus:ring-2 ring-primary-DARK flex-1"
      />

      <IconBallRed />
    </div>
  )
}
