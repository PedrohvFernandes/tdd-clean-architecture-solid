import { ValidationBuilder as sut } from './validation-builder'

import { RequiredFieldValidation } from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    // Um campo pode ter mais de uma validação, e para isso eu chamo o metodo field, passando o nome do campo, e depois chamo o metodo required, que é uma validação de campo obrigatório, e no final chamo o metodo build, que vai retornar um array de validações. Apos o required poderia chamar outros metodos para testar outras validações, nesse caso so testamos o required desse campo especifico(Ex: any_field).
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})
