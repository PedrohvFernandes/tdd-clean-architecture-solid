import { InputHTMLAttributes } from 'react'

import { IconBall } from '../icon-ball'
import { InputDefault } from './'

import { useHookErrorState, useHookForm } from '@/main/hooks'
import { useHookErrorInputMessage } from '@/main/hooks/use-hook-error-input-message'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {}

export function InputForm({ ...propsInput }: InputFormProps) {
  const error = useHookErrorInputMessage(propsInput.name as string)

  const { getStatus, getTitle } = useHookErrorState()

  const { handleChangeField } = useHookForm()

  return (
    <div className="flex items-center relative">
      <InputDefault {...propsInput} onChange={handleChangeField} />

      <IconBall
        title={getTitle(error)}
        data-testid={`${propsInput.name}-status`}
      >
        {getStatus(error)}
      </IconBall>
    </div>
  )
}
