import { InputHTMLAttributes, useRef } from 'react'

import { IconBall } from '../icon-ball'
import { InputDefault } from './'

import { useHookErrorState, useHookForm } from '@/main/hooks'
import { useHookErrorInputMessage } from '@/main/hooks/use-hook-error-input-message'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {}

export function InputForm({ ...propsInput }: InputFormProps) {
  const error = useHookErrorInputMessage(propsInput.name as string)
  const inputRef = useRef<HTMLInputElement>(null)

  const { getStatus, getTitle } = useHookErrorState()

  const { handleChangeField } = useHookForm()

  return (
    <div className="relative border-b-2 border-dashed border-disabled-text text-start  after:h-0.5 after:bg-primary-LIGHT transition-all duration-500 ease-in-out after:w-full after:absolute after:-bottom-0.5 after:left-0 after:origin-left after:scale-x-0 after:transition-all after:duration-500 after:ease-in-out focus-within:border-transparent focus-within:after:scale-x-100 &>.label-input:-translate-y-5 [&>.label-input]:focus-within:-translate-y-5 [&>.label-input]:focus-within:scale-90">
      <InputDefault
        {...propsInput}
        onChange={handleChangeField}
        placeholder=""
        ref={inputRef}
        className="[&:not(:placeholder-shown)+.label-input]:-translate-y-5 [&:not(:placeholder-shown)+.label-input]:scale-90"
      />
      <label
        className="absolute left-2 text-disabled-text cursor-text origin-left translate-y-0 label-input duration-500 ease-in-out"
        onClick={() => inputRef.current?.focus()}
      >
        {propsInput.placeholder}
      </label>
      <IconBall
        title={getTitle(error)}
        data-testid={`${propsInput.name}-status`}
      >
        {getStatus(error)}
      </IconBall>
    </div>
  )
}
