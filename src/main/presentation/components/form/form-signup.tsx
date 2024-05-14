import React from 'react'

import { FormDefault } from './'

interface IFormSignUpProps extends React.HTMLAttributes<HTMLFormElement> {}

export function FormSignUp({ ...rest }: IFormSignUpProps) {
  return <FormDefault {...rest} />
}
