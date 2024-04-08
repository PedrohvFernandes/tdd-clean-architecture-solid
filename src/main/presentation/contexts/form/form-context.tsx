import { ReactNode, createContext, useState } from 'react'

interface IFormContextType {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  errorMessage: string
  setErrorMessage: (errorMessage: string) => void
}

export const FormContext = createContext<IFormContextType>(
  {} as IFormContextType
)

interface IFormProviderProps {
  children: ReactNode
}

export const FormContextProvider = ({ children }: IFormProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  function handlerIsLoading() {
    setIsLoading((prev) => !prev)
  }

  function handlerErrorMessage(message: string) {
    setErrorMessage(message)
  }

  return (
    <FormContext.Provider
      value={{
        isLoading,
        setIsLoading: handlerIsLoading,
        errorMessage,
        setErrorMessage: handlerErrorMessage
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
