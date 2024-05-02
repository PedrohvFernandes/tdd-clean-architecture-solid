import { InputDefault } from './input-default'

import { faker } from '@faker-js/faker'
import { RenderResult, fireEvent, render } from '@testing-library/react'

const makeSut = (fieldName: string): RenderResult => {
  return render(<InputDefault name={fieldName} />)
}

describe('InputDefault Component', () => {
  test('Should begin with readOnly', () => {
    const fieldName = faker.database.column()
    const { getByTestId } = makeSut(fieldName)
    const input = getByTestId(fieldName) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const fieldName = faker.database.column()
    const { getByTestId } = makeSut(fieldName)
    const input = getByTestId(fieldName) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
