import { SignUp } from './signup'

import { Helper } from '@/presentation/test'
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

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationSpy = {
      errorMessage: 'Campo obrigatório'
    }
    const { getByTestId } = makeSutSignUp()

    Helper.testElementChildCount(getByTestId, 'error-wrap', 0)

    Helper.testButtonIsDisabled(getByTestId, 'submit', true)

    Helper.testStatusForField(getByTestId, 'name', validationSpy.errorMessage)

    Helper.testStatusForField(getByTestId, 'email', validationSpy.errorMessage)

    Helper.testStatusForField(
      getByTestId,
      'password',
      validationSpy.errorMessage
    )

    Helper.testStatusForField(
      getByTestId,
      'passwordConfirmation',
      validationSpy.errorMessage
    )
  })
})
