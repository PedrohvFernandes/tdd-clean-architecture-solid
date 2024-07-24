import { memo } from 'react'

import { Logo } from '../logo'
import { DefaultHeader } from './default-header'

function LoginHeader() {
  return (
    <DefaultHeader className="py-6 px-10">
      <Logo />
      <h1 className="text-white text-center">
        4Dev - Enquetes para Programadores
      </h1>
    </DefaultHeader>
  )
}

const LoginHeaderMemo = memo(LoginHeader)

export { LoginHeaderMemo as LoginHeader }
