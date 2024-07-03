import { InputHTMLAttributes, useRef } from 'react'

// import { IconBall } from '../icon-ball'
import { InputDefault } from './'

import { useHookErrorState, useHookForm } from '@/main/hooks'
import { useHookErrorInputMessage } from '@/main/hooks/use-hook-error-input-message'
import { twMerge } from 'tailwind-merge'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {}

export function InputForm({ ...propsInput }: InputFormProps) {
  const error = useHookErrorInputMessage(propsInput.name as string)
  const inputRef = useRef<HTMLInputElement>(null)

  const { getStatus, getTitle } = useHookErrorState()

  const { handleChangeField } = useHookForm()

  return (
    <div
      data-testid={`${propsInput.name}-wrap`}
      className={twMerge(
        'relative border-b-2 border-dashed border-disabled-text text-start  after:h-0.5 after:bg-disabled-text transition-all duration-400 ease-in-out after:w-full after:absolute after:-bottom-0.5 after:left-0 after:origin-left after:scale-x-0 after:transition-all after:duration-400 after:ease-in-out focus-within:border-transparent focus-within:after:scale-x-100 &>.label-input:-translate-y-5 [&>.label-input]:focus-within:-translate-y-5 [&>.label-input]:focus-within:scale-90',
        error
          ? 'border-b-invalid after:bg-invalid'
          : 'border-b-valid after:bg-valid'
      )}
      data-status={error ? 'invalid' : 'valid'}
    >
      <InputDefault
        {...propsInput}
        onChange={handleChangeField}
        title={`${getTitle(error)} ${getStatus(error)}`}
        placeholder=""
        ref={inputRef}
        className="[&:not(:placeholder-shown)+.label-input]:-translate-y-5 [&:not(:placeholder-shown)+.label-input]:scale-90"
      />
      <label
        data-testid={`${propsInput.name}-label`}
        className="absolute left-2 text-disabled-text cursor-text origin-left translate-y-0 label-input duration-400 ease-in-out"
        title={`${getTitle(error)} ${getStatus(error)}`}
        onClick={() => inputRef.current?.focus()}
      >
        {propsInput.placeholder}
      </label>
      {/* <IconBall
        title={getTitle(error)}
        data-testid={`${propsInput.name}-status`}
      >
        {getStatus(error)}
      </IconBall> */}
    </div>
  )
}
