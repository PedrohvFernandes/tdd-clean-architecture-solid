import { setCurrentAccountAdapter } from './current-account-adapter'

import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

// Dessa forma mockamos o LocalStorageAdapter, para que ele não seja chamado de verdade, mas sim o mock que criamos, seria objetos vazios, somente para testar o metodo, com isso não salva nada no localstorage, caso queira ver basta dar um console.log(localStorage) e verá que não tem nada salvo
jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('Sould call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()

    // Estamos espionando o método set do LocalStorageAdapter. No caso a instancia do LocalStorageAdapter que é criada no setCurrentAccountAdapter. Lembrando que a ordem importa, preciso colocar esse spy antes de chamar o método setCurrentAccountAdapter
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)

    // Esperamos que o método set seja chamado com a chave 'account' e o valor da conta -->  set(key: string, value: object): void
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('Should throw UnexpectedError', () => {
    // Quando não passamos a conta ou o token da conta, ele deve lançar um erro
    // É dessa forma que testamos exceções, passando uma função que lança a exceção e esperando que ela seja lançada.
    // Geralmente quando fazemos esse tipo de teste a gente pega uma dependencia da funcão e mocka a dependencia para retornar um valor que faça a função lançar a exceção. Mas nesse caso como é a própria função que lança a exceção, não precisamos fazer isso.
    expect(() => {
      setCurrentAccountAdapter(undefined as any)
    }).toThrow(new UnexpectedError())
  })
})
