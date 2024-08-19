import React, { createContext } from 'react'

import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

export interface IState {
  surveys: LoadSurveyList.Model[]
  error: string
  reload: boolean
}

export interface ISurveyContextType {
  state: IState
  setError: (error: string) => void
  setSurveys: (surveys: LoadSurveyList.Model[]) => void
  setReload: () => void
  setState: React.Dispatch<React.SetStateAction<IState>>
}

export const SurveyContext = createContext<ISurveyContextType>(
  {} as ISurveyContextType
)

// interface ISurveyContextProviderProps {
//   children: ReactNode
// }

// export const SurveyContextProvider = ({
//   children
// }: ISurveyContextProviderProps) => {
//   return <SurveyContext.Provider value={{}}>{children}</SurveyContext.Provider>
// }
