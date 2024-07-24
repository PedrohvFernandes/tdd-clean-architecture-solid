import React from 'react'

interface IFormDefaultProps extends React.HTMLAttributes<HTMLFormElement> {}

export function FormDefault({ ...props }: IFormDefaultProps) {
  return (
    <form
      {...props}
      className="flex flex-col gap-8 smartphone-sm:w-[400px] mx-2 smartphone-sm:mx-0 bg-white p-10 rounded-lg self-center text-center shadow"
    />
  )
}
