import React, { memo } from 'react'

interface IconBallRedProps extends React.HTMLAttributes<HTMLSpanElement> {}

function IconBall(props: IconBallRedProps) {
  return (
    <span
      {...props}
      className="absolute right-2 cursor-help hover:animate-pulse text-sm"
    />
  )
}

const MemoIconBall = memo(IconBall)

export { MemoIconBall as IconBall }
