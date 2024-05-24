import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory'
import { makeSignupValidation } from './signup-validation-factory'

import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { SignUp } from '@/main/presentation/pages/signup/signup'

export function MakeSignUp() {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      saveAccessTokenMock={makeLocalSaveAccessToken()}
    />
  )
}
