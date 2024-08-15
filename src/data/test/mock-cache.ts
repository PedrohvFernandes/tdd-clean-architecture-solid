import { GetStorage } from '../protocols/cache'

import { faker } from '@faker-js/faker'

export class GetStorageSpy implements GetStorage {
  key: string | undefined
  value = {
    // accessToken: faker.string.uuid(),
    // name: faker
    randomProperty: faker.word.adjective(),
    randomProperty2: faker.word.adjective()
  }

  get(key: string): any {
    this.key = key
    return this.value
  }
}
