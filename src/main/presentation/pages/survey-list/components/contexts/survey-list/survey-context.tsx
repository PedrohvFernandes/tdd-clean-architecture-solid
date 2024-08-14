import { createContext } from 'react'

import { SurveyModel } from '@/domain/models'

export interface IState {
  surveys: SurveyModel[]
  error: string
}

export interface ISurveyContextType {
  state: IState
  setError: (error: string) => void
  setSurveys: (surveys: SurveyModel[]) => void
  // setState: React.Dispatch<React.SetStateAction<IState>>
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
