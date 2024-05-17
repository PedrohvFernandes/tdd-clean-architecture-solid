import { faker } from '@faker-js/faker'
import {
  Matcher,
  MatcherOptions,
  RenderResult,
  fireEvent,
  waitFor
} from '@testing-library/react'

// Helpers
// Helpers 1: O emailValue e passwordValue ja fica injetado no helper, com valores ja padrões para testes que não precisa necessariamente se os valores estão iguais(corretos - comparação), ex: o spinner que os campos so precisam estar preenchidos para fazer o spinner aparecer
// const simulateValidSubmit = (
//   sutLogin: RenderResult,
//   emailValue = faker.internet.email(),
//   passwordValue = faker.internet.password()
// ): void => {
//   const getByTestId = sutLogin.getByTestId

//   const emailInput = getByTestId('email')
//   // const emailValue = faker.internet.email()

//   const passwordInput = getByTestId('password')
//   // const passwordValue = faker.internet.password()

//   fireEvent.input(emailInput, {
//     target: { value: emailValue }
//   })

//   fireEvent.input(passwordInput, {
//     target: { value: passwordValue }
//   })

//   const submitButton = getByTestId('submit')
//   fireEvent.click(submitButton)
// }

export const simulateValidSubmit = async (
  sutLogin: RenderResult,
  emailValue = faker.internet.email(),
  passwordValue = faker.internet.password()
): Promise<void> => {
  const getByTestId = sutLogin.getByTestId

  // populateEmailField(getByTestId, emailValue)
  populateField(getByTestId, 'email', emailValue)
  // populatePasswordField(getByTestId, passwordValue)
  populateField(getByTestId, 'password', passwordValue)

  // const submitButton = getByTestId('submit')
  // fireEvent.click(submitButton)

  const form = getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

// Helper 2: Popula os campos com valores
// const populateField = (
//   sutLogin: RenderResult,
//   fieldName: string,
//   inputValue: string
// ): void => {
//   const input = sutLogin.getByTestId(fieldName)
//   fireEvent.input(input, { target: { inputValue } })
//   console.log(input)
// }
// Helper 2: Popula o campo de email
// export const populateEmailField = (
//   // sutLogin: RenderResult,
//   getByTestId: (
//     id: Matcher,
//     options?: MatcherOptions | undefined
//   ) => HTMLElement,
//   emailValue = faker.internet.email()
// ): void => {
//   // const emailInput = sutLogin.getByTestId('email')
//   const emailInput = getByTestId('email')
//   fireEvent.input(emailInput, { target: { value: emailValue } })
// }
// // Helper 3: Popula o campo de password
// export const populatePasswordField = (
//   // sutLogin: RenderResult,
//   getByTestId: (
//     id: Matcher,
//     options?: MatcherOptions | undefined
//   ) => HTMLElement,
//   passwordValue = faker.internet.password()
// ): void => {
//   // const passwordInput = sutLogin.getByTestId('password')
//   const passwordInput = getByTestId('password')
//   fireEvent.input(passwordInput, { target: { value: passwordValue } })
// }
export const populateField = (
  // sutLogin: RenderResult,
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement,
  fieldName: string,
  fieldValue = faker.word.adjective()
): void => {
  // const emailInput = sutLogin.getByTestId('email')
  const input = getByTestId(fieldName)
  fireEvent.input(input, { target: { value: fieldValue } })
}

// Helper 6
export const testElementExist = (
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement,
  fieldName: string
): void => {
  // const ellipsis = getByTestId('ellipsis')

  // expect(ellipsis).toBeTruthy()

  const el = getByTestId(fieldName)
  expect(el).toBeTruthy()
}

// Helper 7
export const testElementText = (
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement,
  fieldName: string,
  text: string
): void => {
  // const mainError = getByTestId('main-error')
  // expect(mainError.textContent).toBe(error.message)
  const el = getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

// Helper 5
export const testElementChildCount = (
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement,
  fieldName: string,
  count: number
): void => {
  // por exemplo: Em form status data-testid="error-wrap"
  const el = getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement,
  fieldName: string,
  validationErrorMessage?: string
): void => {
  const fieldNameStatus = getByTestId(`${fieldName}-status`)

  expect(fieldNameStatus.title).toBe(validationErrorMessage ?? 'Tudo Certo!')
  expect(fieldNameStatus.textContent).toBe(validationErrorMessage ? '🔴' : '🟢')
}
