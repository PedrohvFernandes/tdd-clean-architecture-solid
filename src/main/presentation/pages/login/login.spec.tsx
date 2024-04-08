// import React from 'react'

import { Login } from './login'

import { render } from '@testing-library/react'

describe('Login Component', () => {
  test('Should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    // No inicio o status não deve ter nada, nem o spinner nem a mensagem de erro
    expect(errorWrap.childElementCount).toBe(0)
  })
})
