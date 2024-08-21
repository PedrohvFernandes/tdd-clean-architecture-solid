import { GetStorage, SetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object) {
    if (!value) {
      localStorage.removeItem(key)
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string): any {
    // Nem sempre é o account, podemos usar esse mesmo metodo para achar outra coisa. O mesmo vale para o set, para set qualquer chave:valor
    const objAny = JSON.parse(localStorage.getItem(key) as string)
    return objAny
  }
}
