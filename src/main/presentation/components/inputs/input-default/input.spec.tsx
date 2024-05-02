import { InputDefault } from './input-default'

import { RenderResult, render } from '@testing-library/react'

const makeSut = (): RenderResult => {
  return render(<InputDefault />)
}

describe('InputDefault Component', () => {
  test('Should begin with readOnly', () => {
    const { getByTestId } = makeSut()
    const input = getByTestId('input-default') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
