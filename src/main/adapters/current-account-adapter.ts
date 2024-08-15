import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory'

import { InvalidSaveAccessToken } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account || !account.accessToken) {
    throw new InvalidSaveAccessToken()
  }

  makeLocalStorageAdapter().set('account', account)
}
export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get('account')
}
