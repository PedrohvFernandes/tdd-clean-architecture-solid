import { ReactNode, createContext } from 'react'

import { AccountModel } from '@/domain/models'
import { setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'

export interface IApiContextType {
  setCurrentAccount: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

export const ApiContext = createContext<IApiContextType>({} as IApiContextType)

interface IApiProviderProps {
  children: ReactNode
}

export const ApiContextProvider = ({ children }: IApiProviderProps) => {
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
