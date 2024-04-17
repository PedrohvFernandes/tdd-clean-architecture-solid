// import React from 'react'

import { Login } from './login'

import { RenderResult, render } from '@testing-library/react'

type SutTypes = {
  sut: RenderResult
}

// Factory
const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()

    // sut.getAllByTestId
    const { getByTestId } = sut
    // Em form status data-testid="error-wrap"
    const errorWrap = getByTestId('error-wrap')
    // No inicio o status não deve ter nada, nem o spinner nem a mensagem de erro
    expect(errorWrap.childElementCount).toBe(0)

    // Fazemos um cast para HTMLInputElement para ter acesso a propriedade disabled
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    // Testando os inputs
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
