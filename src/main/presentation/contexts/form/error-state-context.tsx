import { ReactNode, createContext, useState } from 'react'

interface IErrorStateContextType {
  // errorState: Record<string, string>
  // setErrorState: (errorState: Record<string, string>) => void
  // setEmailError: (emailError: string) => void
  // setPasswordError: (passwordError: string) => void

  email: string
  password: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void

  errorMessageMain: string
  setErrorMessageMain: (errorMessage: string) => void
}

export const ErrorContext = createContext<IErrorStateContextType>(
  {} as IErrorStateContextType
)

interface IErrorSateProviderProps {
  children: ReactNode
}

export const ErrorStateContextProvider = ({
  children
}: IErrorSateProviderProps) => {
  const [email, setEmail] = useState<string>('Campo obrigatório')
  const [password, setPassword] = useState<string>('Campo obrigatório')
  const [errorMessageMain, setErrorMessageMain] = useState<string>('')

  // const [errorState, setErrorState] = useState<Record<string, string>>({
  //   email: 'Campo obrigatório',
  //   password: 'Campo obrigatório'
  // })

  // function handlerEmailError(emailError: string) {
  //   setErrorState((prev) => ({ ...prev, email: emailError }))
  // }

  // function handlerPasswordError(passwordError: string) {
  //   setErrorState((prev) => ({ ...prev, password: passwordError }))
  // }

  // function handlerErrorState(errorState: Record<string, string>) {
  //   setErrorState(errorState)
  // }

  function handlerEmail(email: string) {
    setEmail(email)
  }

  function handlerPassword(password: string) {
    setPassword(password)
  }
  function handlerErrorMessageMain(message: string) {
    setErrorMessageMain(message)
  }

  return (
    <ErrorContext.Provider
      value={{
        email,
        password,
        setEmail: handlerEmail,
        setPassword: handlerPassword,
        errorMessageMain,
        setErrorMessageMain: handlerErrorMessageMain
      }}
    >
      {children}
    </ErrorContext.Provider>
  )
}
