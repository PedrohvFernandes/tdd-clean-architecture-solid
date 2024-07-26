import { SetStorage } from '../protocols/cache'

/*
  Existe tres tipos de mocks/dublês de testes, são eles:

  O Spy --> O spy é um mock que captura valores de parâmetros passados e retorna um valor mockado.

  O Stub --> Onde não capturamos os valores de parâmetros, apenas retornamos um valor fixo. O professor fez isso em validation --> ValidationStub na camada de presentation. No meu caso eu consegui validar o valor do parâmetro(Que era se os campos estavam certos), então não usei stub, e sim Spy --> ValidationSpy

  O Mock --> Captura os valores e não precisa mocar nada, retornar nada

*/
export class SetStorageMock implements SetStorage {
  value: any
  key: string = ''

  set(key: string, value: any): void {
    this.key = key
    this.value = value
  }
}
