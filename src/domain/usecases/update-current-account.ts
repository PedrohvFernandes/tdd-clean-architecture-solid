// export interface SaveAccessToken {
//   // Mesmo que hoje o localstorage não seja uma promise, mas caso um dia usemos algo que seja, como uma lib que retorne uma promise, esse método já está preparado para isso.
//   save: (accessToken: string) => Promise<void>
// }

import { AccountModel } from '../models'

export interface UpdateCurrentAccount {
  // Mesmo que hoje o localstorage não seja uma promise, mas caso um dia usemos algo que seja, como uma lib que retorne uma promise, esse método já está preparado para isso.
  save: (account: AccountModel) => Promise<void>
}
