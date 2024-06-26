import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

// Um composite de validações, composição de varios validators, onde os filhos(objetos que serão compostos do composite) do pai(composite) não terão o mesmo tipo de interface do pai, logo não estamos com 100% do composite por conta que os filhos não tem a mesma interface(tipo) do pai. Nesse caso usamos a interface Validation para o pai  da camada de apresentação e FieldValidation para os filhos. O porque disso é para que os validates fiquem mais limpos e diretos
// Esse validators desacoplamos a validação do componente, e assim podemos testar a validação sem precisar do componente. Seria mais ou menos o uso de Zod, Yup, Joi, react hook forms etc, usando o schema dos mesmos para validação de campos, so que nesse caso o componente ficaria acoplado a validação, e com o uso do composite, desacoplamos a validação do componente. Obviamente que poderíamos juntar o composite com zod etc para validar os campos, mas estamos tentando desacoplar do maximo de libs possiveis. Injetamos a validação no componente, e não o componente na validação. Ou seja, passamos o composite de validação para ele e no componente fica como algo abstrato, so chamando o validate para validar os campos quando setar alguma informação no campo(email, password...).
export class RequiredFieldValidation implements FieldValidation {
  // O fieldName no composite é importante, porque é através dele que vamos disparar todas as validações. Pegamos todos os filhos dele(RequiredFieldValidation), ex: EmailFieldValidation, PasswordFieldValidation, etc, e chamamos o validate de cada um deles, passando o valor do campo e o nome do campo(pelo construtor), e assim validamos todos os campos do form. Então cada campo é um FieldValidation e cada um tem um fieldName, e o seu metodo validate, que é chamado pelo composite.
  // Como essa propriedade fieldName é da interface publica FieldValidation então essa propriedade não pode ser private
  constructor(readonly fieldName: string) {}

  // So validamos caso não tenha algum valor retornamos erro, esse é objetivo principal do validate, para validar os campos do form
  validate(input: object): Error | null {
    return input[this.fieldName] ? null : new RequiredFieldError(this.fieldName)
  }
}
