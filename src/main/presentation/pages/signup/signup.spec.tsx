import { SignUp } from './signup'

import {
  Matcher,
  MatcherOptions,
  RenderResult,
  render
} from '@testing-library/react'

type SutSignUpTypesReturn = {
  sutSignUp: RenderResult
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement
}

const makeSutSignUp = (): SutSignUpTypesReturn => {
  const sutSignUp = render(<SignUp />)

  const { getByTestId } = sutSignUp

  return {
    sutSignUp,
    getByTestId
  }
}

// Helper 5
const testElementChildCount = (
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

const testButtonIsDisabled = (
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

const testStatusForField = (
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

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationSpy = {
      errorMessage: 'Campo obrigatório'
    }
    const { getByTestId } = makeSutSignUp()

    testElementChildCount(getByTestId, 'error-wrap', 0)

    testButtonIsDisabled(getByTestId, 'submit', true)

    testStatusForField(getByTestId, 'name', validationSpy.errorMessage)

    testStatusForField(getByTestId, 'email', validationSpy.errorMessage)

    testStatusForField(getByTestId, 'password', validationSpy.errorMessage)

    testStatusForField(
      getByTestId,
      'passwordConfirmation',
      validationSpy.errorMessage
    )
  })
})
