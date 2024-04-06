import React, { memo } from 'react'

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

function Footer(props: FooterProps) {
  return <footer {...props} className="bg-primary h-12" />
}

const MemoFooter = memo(Footer)

export { MemoFooter as Footer }
