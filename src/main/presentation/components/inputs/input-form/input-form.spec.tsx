import { InputForm } from './'

import { ErrorStateContextProvider } from '@/main/presentation/contexts/form/error-state-context'
import { faker } from '@faker-js/faker'
import { RenderResult, fireEvent, render } from '@testing-library/react'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <ErrorStateContextProvider>
      <InputForm name={fieldName} />
    </ErrorStateContextProvider>
  )
}

describe('InputForm Component', () => {
  test('Should focus input on label click', () => {
    const fieldName = faker.database.column()

    const { getByTestId } = makeSut(fieldName)

    const input = getByTestId(fieldName)
    const label = getByTestId(`${fieldName}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
