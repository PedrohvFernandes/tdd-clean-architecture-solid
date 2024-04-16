import { ReactNode, createContext, useState } from 'react'

interface IFormContextType {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const FormContext = createContext<IFormContextType>(
  {} as IFormContextType
)

interface IFormProviderProps {
  children: ReactNode
}

export const FormContextProvider = ({ children }: IFormProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handlerIsLoading() {
    setIsLoading((prev) => !prev)
  }

  return (
    <FormContext.Provider
      value={{
        isLoading,
        setIsLoading: handlerIsLoading
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
