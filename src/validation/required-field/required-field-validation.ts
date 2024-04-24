import { RequiredFieldError } from '../errors'
import { FieldValidation } from '../protocols/field-validation'

// Um composite de validações, composição de varios validators, onde os filhos(obejetos que serão compostos do composite) do pai(composite) não terão o mesmo tipo de interface do pai, logo não estamos com 100% do composite por conta que os filhos não tem a mesma interface(tipo) do pai. Nesse caso usamos a interface FieldValidation para o pai, e os filhos terão a interface validation da camada de apresentação. O porque disso é para que os validates fiquem mais limpos e diretos
export class RequiredFieldValidation implements FieldValidation {
  // O fieldName no coposite é importante, porque é através dele que vamos disparar todas as validações. Pegamos todos os filhos dele(RequiredFieldValidation), ex: EmailFieldValidation, PasswordFieldValidation, etc, e chamamos o validate de cada um deles, passando o valor do campo e o nome do campo(pelo construtor), e assim validamos todos os campos do form. Então cada campo é um FieldValidation e cada um tem um fieldName, e o seu metodo validate, que é chamado pelo composite.
  constructor(readonly fieldName: string) {}

  // So validamos caso não tenha algum valor retornamos erro, esse é objetivo principal do validate, para validar os campos do form
  validate(fieldValue: string): Error | null {
    return fieldValue ? null : new RequiredFieldError()
  }
}
