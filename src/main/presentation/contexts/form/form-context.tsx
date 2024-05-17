import React, { ReactNode, createContext, useState } from 'react'

interface IFormContextType {
  isLoading: boolean
  setIsLoading: () => void
  name: string
  setName: (name: string) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  passwordConfirmation: string
  setPasswordConfirmation: (passwordConfirmation: string) => void

  handleChangeField: (event: React.FocusEvent<HTMLInputElement>) => void
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
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
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

  // Altera o estado do email
  function handlerEmail(email: string) {
    setStateForm((prev) => ({
      ...prev,
      email
    }))
  }

  // Altera o estado do password
  function handlerPassword(password: string) {
    setStateForm((prev) => ({
      ...prev,
      password
    }))
  }

  function handlerName(name: string) {
    setStateForm((prev) => ({
      ...prev,
      name
    }))
  }

  function handlerPasswordConfirmation(passwordConfirmation: string) {
    setStateForm((prev) => ({
      ...prev,
      passwordConfirmation
    }))
  }

  // Altera de acordo com o input que está sendo alterado
  function handleChangeField(event: React.FocusEvent<HTMLInputElement>) {
    // Qualquer metodo funciona, so deixei um comentado para fins didáticos

    // setStateForm({
    //   ...stateForm,
    //   // Nome do input e valor do input
    //   [event.target.name]: event.target.value
    // })
    setStateForm((prev) => ({
      ...prev,
      // Nome do input e valor do input
      [event.target.name]: event.target.value
    }))
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
        handleChangeField,
        name: stateForm.name,
        setName: handlerName,
        passwordConfirmation: stateForm.passwordConfirmation,
        setPasswordConfirmation: handlerPasswordConfirmation
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
