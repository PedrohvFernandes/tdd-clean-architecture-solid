import { ReactNode, createContext, useEffect, useState } from 'react'

export interface IErrorStateContextType {
  // errorState: Record<string, string>
  // setErrorState: (errorState: Record<string, string>) => void
  // setEmailError: (emailError: string) => void
  // setPasswordError: (passwordError: string) => void

  nameError: string
  setNameError: (name: string) => void
  emailError: string
  passwordError: string
  setEmailError: (email: string) => void
  setPasswordError: (password: string) => void
  passwordConfirmationError: string
  setPasswordConfirmationError: (passwordConfirmation: string) => void
  isFormInvalid: boolean
  setIsFormInvalid: (isFormInvalid: boolean) => void

  errorMessageMain: string
  setErrorMessageMain: (errorMessage: string) => void

  getStatus: (error: unknown) => string
  getTitle: (error: unknown) => string
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
  const [nameError, setNameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState<string>('')
  const [errorMessageMain, setErrorMessageMain] = useState<string>('')
  const [isFormInvalid, setIsFormInvalid] = useState<boolean>(true)

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

  // function handlerEmail(email: string) {
  //   setEmailError(email)
  // }

  // function handlerPassword(password: string) {
  //   setPasswordError(password)
  // }

  // function handlerErrorMessageMain(message: string) {
  //   setErrorMessageMain(message)
  // }

  const getStatus = (error: unknown): string => {
    return error ? '🔴' : '🟢'
  }

  const getTitle = (error: unknown): string => {
    return error ? (error as string) : 'Tudo Certo!'
  }

  useEffect(() => {
    setIsFormInvalid(
      !!nameError ||
        !!emailError ||
        !!passwordError ||
        !!passwordConfirmationError
    )
  }, [nameError, emailError, passwordError, passwordConfirmationError])

  return (
    <ErrorContext.Provider
      value={{
        nameError,
        setNameError,
        emailError,
        passwordError,
        setEmailError,
        setPasswordError,
        passwordConfirmationError,
        setPasswordConfirmationError,
        isFormInvalid,
        setIsFormInvalid,
        errorMessageMain,
        setErrorMessageMain,
        getStatus,
        getTitle
      }}
    >
      {children}
    </ErrorContext.Provider>
  )
}
