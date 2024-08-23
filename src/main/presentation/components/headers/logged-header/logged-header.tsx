import React, { memo } from 'react'

import { Logo } from '../../logo'
import { DefaultHeader } from '../default-header'

import { useLogout } from '@/main/hooks'
import { useHookApi } from '@/main/hooks/use-hook-api-context'

function LoggedHeader() {
  const { logout } = useLogout()

  const { getCurrentAccount } = useHookApi()

  const buttonClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault()
    logout()
  }
  return (
    <DefaultHeader>
      <div className="flex justify-between items-center w-full max-w-[800px] flex-grow py-6 px-10">
        <Logo className="size-20" />

        <div className="flex flex-col items-end text-white gap-2">
          <span data-testid="username"> {getCurrentAccount().name}</span>
          <a
            data-testid="logout"
            className="hover:underline text-sm"
            href="#"
            onClick={buttonClick}
          >
            Sair
          </a>
        </div>
      </div>
    </DefaultHeader>
  )
}

const LoggedHeaderMemo = memo(LoggedHeader)

export { LoggedHeaderMemo as LoggedHeader }
