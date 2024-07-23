import React, { memo } from 'react'

import { twMerge } from 'tailwind-merge'

interface IDefaultHeaderProps extends React.HTMLAttributes<HTMLElement> {}

function DefaultHeader({ ...props }: IDefaultHeaderProps) {
  return (
    <header
      {...props}
      className={twMerge(
        'bg-primary flex flex-col items-center border-t-[40px] border-primary-DARK',
        props.className
      )}
    />
  )
}

const DefaultHeaderMemo = memo(DefaultHeader)

export { DefaultHeaderMemo as DefaultHeader }
