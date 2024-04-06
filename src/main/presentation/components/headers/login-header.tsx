import { memo } from 'react'

import { Logo } from '../logo'

function LoginHeader() {
  return (
    <header className="bg-primary flex flex-col items-center border-t-[40px] border-primary-DARK gap-4 py-10">
      <Logo />
      <h1 className="text-white">4Dev - Enquetes para Programadores</h1>
    </header>
  )
}

const LoginHeaderMemo = memo(LoginHeader)

export { LoginHeaderMemo as LoginHeader }
