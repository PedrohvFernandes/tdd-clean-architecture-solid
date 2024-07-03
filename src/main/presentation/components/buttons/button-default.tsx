import React from 'react'

import { useHookErrorState, useHookForm } from '@/main/hooks'

interface IButtonDefaultProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonDefault({ ...props }: IButtonDefaultProps) {
  const { isFormInvalid } = useHookErrorState()
  const { isLoading } = useHookForm()

  return (
    <button
      {...props}
      className="bg-primary text-white rounded-lg border-none p-4 hover:opacity-90 disabled:bg-disabled-background disabled:text-disabled-text disabled:cursor-not-allowed ease-in-out duration-300"
      data-testid={props.name ? props.name : 'button-default'}
      disabled={isLoading || isFormInvalid}
    />
  )
}
