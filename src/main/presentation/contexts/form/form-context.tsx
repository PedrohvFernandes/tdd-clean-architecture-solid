import { ReactNode, createContext, useState } from 'react'

interface IFormContextType {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  email: string
  setEmail: (email: string) => void
}

export const FormContext = createContext<IFormContextType>(
  {} as IFormContextType
)

interface IFormProviderProps {
  children: ReactNode
}

export const FormContextProvider = ({ children }: IFormProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')

  function handlerIsLoading() {
    setIsLoading((prev) => !prev)
  }

  function handlerEmail(email: string) {
    setEmail(email)
  }

  return (
    <FormContext.Provider
      value={{
        isLoading,
        setIsLoading: handlerIsLoading,
        email,
        setEmail: handlerEmail
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
