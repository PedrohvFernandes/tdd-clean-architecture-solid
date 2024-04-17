import React, { ReactNode, createContext, useState } from 'react'

interface IFormContextType {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void

  handleChange: (event: React.FocusEvent<HTMLInputElement>) => void
  stateForm: {
    email: string
    password: string
  }
}

export const FormContext = createContext<IFormContextType>(
  {} as IFormContextType
)

interface IFormProviderProps {
  children: ReactNode
}

export const FormContextProvider = ({ children }: IFormProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [email, setEmail] = useState<string>('')
  // const [password, setPassword] = useState<string>('')
  const [stateForm, setStateForm] = useState({
    email: '',
    password: ''
  })

  function handlerIsLoading() {
    setIsLoading((prev) => !prev)
  }

  // function handlerEmail(email: string) {
  //   setEmail(email)
  // }

  // function handlerPassword(password: string) {
  //   setPassword(password)
  // }

  // function handleChange(event: React.FocusEvent<HTMLInputElement>) {
  //   switch (event.target.name) {
  //     case 'email':
  //       setEmail(event.target.value)
  //       break
  //     case 'password':
  //       setPassword(event.target.value)
  //       break
  //     default:
  //       break
  //   }
  // }

  function handlerEmail(email: string) {
    setStateForm((prev) => ({
      ...prev,
      email
    }))
  }

  function handlerPassword(password: string) {
    setStateForm((prev) => ({
      ...prev,
      password
    }))
  }

  function handleChange(event: React.FocusEvent<HTMLInputElement>) {
    setStateForm({
      ...stateForm,
      [event.target.name]: event.target.value
    })
  }
  return (
    <FormContext.Provider
      value={{
        isLoading,
        setIsLoading: handlerIsLoading,
        email: stateForm.email,
        setEmail: handlerEmail,
        password: stateForm.password,
        setPassword: handlerPassword,
        handleChange,
        stateForm
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
