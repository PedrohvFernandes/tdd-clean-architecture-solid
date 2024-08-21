import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Logo } from '../../logo'
import { DefaultHeader } from '../default-header'

import { ConfigRoute } from '@/config/index'
import { useHookApi } from '@/main/hooks/use-hook-api-context'

function LoggedHeader() {
  const { setCurrentAccount } = useHookApi()
  const navigate = useNavigate()

  const logout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault()

    setCurrentAccount(undefined as any)
    navigate(ConfigRoute.fourDev.login.path)
  }
  return (
    <DefaultHeader>
      <div className="flex justify-between items-center w-full max-w-[800px] flex-grow py-6 px-10">
        <Logo className="size-20" />

        <div className="flex flex-col items-end text-white gap-2">
          {/* <span>{getCurrentAccount().name}</span> */}
          <a
            data-testid="logout"
            className="hover:underline text-sm"
            href="#"
            onClick={logout}
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
