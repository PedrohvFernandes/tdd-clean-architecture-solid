import React from 'react'

import { twMerge } from 'tailwind-merge'

interface BallProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Ball(props: BallProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'absolute size-3 bg-current rounded-full',
        props.className
      )}
    />
  )
}
