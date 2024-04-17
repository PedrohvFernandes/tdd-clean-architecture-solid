import { ReactNode, createContext, useState } from 'react'

interface IErrorStateContextType {
  // errorState: Record<string, string>
  // setErrorState: (errorState: Record<string, string>) => void
  // setEmailError: (emailError: string) => void
  // setPasswordError: (passwordError: string) => void

  emailError: string
  passwordError: string
  setEmailError: (email: string) => void
  setPasswordError: (password: string) => void

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
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
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
    setEmailError(email)
  }

  function handlerPassword(password: string) {
    setPasswordError(password)
  }
  function handlerErrorMessageMain(message: string) {
    setErrorMessageMain(message)
  }

  return (
    <ErrorContext.Provider
      value={{
        emailError,
        passwordError,
        setEmailError: handlerEmail,
        setPasswordError: handlerPassword,
        errorMessageMain,
        setErrorMessageMain: handlerErrorMessageMain
      }}
    >
      {children}
    </ErrorContext.Provider>
  )
}
