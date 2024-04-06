import { memo } from 'react'

function IconBallRed() {
  return (
    <span className="absolute right-2 cursor-help hover:animate-bounce">
      🔴
    </span>
  )
}

const MemoIconBallRed = memo(IconBallRed)

export { MemoIconBallRed as IconBallRed }
