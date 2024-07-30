import { ReactNode, createContext } from 'react'

import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export interface IApiContextType {
  setCurrentAccount: (account: AccountModel) => void
}

export const ApiContext = createContext<IApiContextType>({} as IApiContextType)

interface IApiProviderProps {
  children: ReactNode
}

export const ApiContextProvider = ({ children }: IApiProviderProps) => {
  const setCurrentAccountAdapter = (account: AccountModel): void => {
    if (!account || !account.accessToken) {
      throw new UnexpectedError()
    }

    makeLocalStorageAdapter().set('account', account)
  }

  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}
