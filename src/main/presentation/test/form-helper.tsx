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
  const el = screen.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

// Helper 7
export const testElementText = (fieldName: string, text: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

// Helper 5
export const testElementChildCount = (
  fieldName: string,
  count: number
): void => {
  // por exemplo: Em form status data-testid="error-wrap"
  const el = screen.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (
  fieldName: string,
  validationErrorMessage?: string
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(fieldName)
  const label = screen.getByTestId(`${fieldName}-label`)

  expect(wrap.getAttribute('data-status')).toBe(
    validationErrorMessage ? 'invalid' : 'valid'
  )
  expect(field.title).toBe(
    validationErrorMessage ? `${validationErrorMessage} 🔴` : 'Tudo Certo! 🟢'
  )

  expect(label.title).toBe(
    validationErrorMessage ? `${validationErrorMessage} 🔴` : 'Tudo Certo! 🟢'
  )
}
