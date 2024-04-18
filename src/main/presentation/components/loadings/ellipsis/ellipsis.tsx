import React from 'react'

import { Ball } from './ball'

import { twMerge } from 'tailwind-merge'

interface EllipsisProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Ellipsis(props: EllipsisProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'text-primary-LIGHT inline-block relative w-20 h-3',
        props.className
      )}
      data-testid="ellipsis"
    >
      <Ball className="animate-ldsEllipsis1 left-2" />
      <Ball className="animate-ldsEllipsis2 left-2" />
      <Ball className="animate-ldsEllipsis2 left-8" />
      <Ball className="animate-ldsEllipsis3 left-14" />
    </div>
  )
}
