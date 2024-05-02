import { InputDefault } from './input-default'

import { render } from '@testing-library/react'

describe('InputDefault Component', () => {
  test('Should begin with readOnly', () => {
    const { getByTestId } = render(<InputDefault />)
    const input = getByTestId('input-default') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
