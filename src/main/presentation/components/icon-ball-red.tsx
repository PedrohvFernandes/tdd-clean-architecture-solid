import React, { memo } from 'react'

interface IconBallRedProps extends React.HTMLAttributes<HTMLSpanElement> {}

function IconBallRed(props: IconBallRedProps) {
  return (
    <span
      {...props}
      className="absolute right-2 cursor-help hover:animate-pulse "
    />
  )
}

const MemoIconBallRed = memo(IconBallRed)

export { MemoIconBallRed as IconBallRed }
