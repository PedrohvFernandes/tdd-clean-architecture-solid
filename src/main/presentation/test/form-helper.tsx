import { faker } from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

// Helpers

export const populateField = (
  fieldName: string,
  fieldValue = faker.word.adjective()
): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value: fieldValue } })
}

// Helper 6
export const testElementExist = (fieldName: string): void => {
  // o QUERY é para não dar erro caso não encontre o elemento, para não quebrar o teste, ele só vai retornar null. o Query é justamente para olhar se o elemento existe ou não no DOM
  const el = screen.queryByTestId(fieldName)
  expect(el).toBeInTheDocument()
}

// Helper 7
export const testElementText = (fieldName: string, text: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el).toHaveTextContent(text)
}

// Helper 5
export const testElementChildCount = (
  fieldName: string,
  count: number
): void => {
  // por exemplo: Em form status data-testid="error-wrap"
  const el = screen.getByTestId(fieldName)
  expect(el.children).toHaveLength(count)
}

export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = screen.getByTestId(fieldName)
  isDisabled ? expect(button).toBeDisabled() : expect(button).toBeEnabled()
}

export const testStatusForField = (
  fieldName: string,
  validationErrorMessage?: string
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(fieldName)
  const label = screen.getByTestId(`${fieldName}-label`)

  expect(wrap).toHaveAttribute(
    'data-status',
    validationErrorMessage ? 'invalid' : 'valid'
  )
  expect(field).toHaveProperty(
    'title',
    validationErrorMessage ? `${validationErrorMessage} 🔴` : 'Tudo Certo! 🟢'
  )

  expect(label).toHaveProperty(
    'title',
    validationErrorMessage ? `${validationErrorMessage} 🔴` : 'Tudo Certo! 🟢'
  )
}
