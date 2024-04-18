import React from 'react'

interface IFormDefaultProps extends React.HTMLAttributes<HTMLFormElement> {}

export function FormDefault({ ...props }: IFormDefaultProps) {
  return (
    <form
      {...props}
      className="flex flex-col gap-4 w-[400px] bg-white p-10 rounded-lg self-center text-center shadow"
    />
  )
}
