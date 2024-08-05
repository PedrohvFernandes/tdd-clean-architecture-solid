import { memo } from 'react'

import { Logo } from '../logo'
import { DefaultHeader } from './default-header'

import { useHookApi } from '@/main/hooks/use-hook-api-context'

function LoggedHeader() {
  const { getCurrentAccount } = useHookApi()
  return (
    <DefaultHeader>
      <div className="flex justify-between items-center w-full max-w-[800px] flex-grow py-6 px-10">
        <Logo className="size-20" />

        <div className="flex flex-col items-end text-white gap-2">
          <span>{getCurrentAccount().name}</span>
          <a className="hover:underline text-sm" href="#">
            Sair
          </a>
        </div>
      </div>
    </DefaultHeader>
  )
}

const LoggedHeaderMemo = memo(LoggedHeader)

export { LoggedHeaderMemo as LoggedHeader }
