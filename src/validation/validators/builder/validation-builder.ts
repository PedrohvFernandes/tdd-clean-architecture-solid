import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation'

import { FieldValidation } from '@/validation/protocols'
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation
} from '@/validation/validators'

export class ValidationBuilder {
  // Construtor privado para que não seja possivel instanciar a classe ValidationBuilder fora dela mesma.
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  // é o metodo que vai ser chamado para iniciar a construção da validação, sem ele não é possivel iniciar a construção. Os metodos estaticos eu acesso através da classe e não da instancia(objeto que é criado através da classe usando o new, ou seja, é o unico metodo acessível diretamente. Podemos entender que a classe é um molde e o objeto é o que é criado a partir desse molde.), e nós aqui, nesse escopos estatico não temos acesso a this que é objeto instanciado. Agora o metodo de instancia eu acesso através do objeto que é criado a partir da classe, mas não são estáticos.
  static field(fieldName: string): ValidationBuilder {
    // aqui eu crio uma instancia da classe ValidationBuilder e retorno uma instancia nova, e a partir disso eu consigo acessar os metodos de instancia, porque o field é um metodo estatico e ele retorna uma instancia da classe ValidationBuilder. Dessa forma eu consigo acessar os metodos de instancia, concatenando um metodo apos o outro.
    // Passamos o campo que esta sendo testado e um array de validações vazio, porque no inicio não tem nenhuma validação, e a medida que vamos chamando os metodos de instancia, vamos adicionando as validações ao array de validações, como por exemplo o required, ele adiciona a validação de campo obrigatório ao array de validações para esse campo.
    return new ValidationBuilder(fieldName, [])
  }

  // Esse metodo utiliza da classe de teste RequiredFieldValidation, que é uma validação de campo obrigatório, e ele vai adicionar essa validação ao array de validações, e retornar a instancia para continuar concatenando um metodo apos o outro.
  required() {
    // Apos chamar o metodo field passando o campo que esta sendo testado, chamamos o metodo required, e ele vai adicionar a validação de campo obrigatório ao array de validações daquele campo que esta sendo testado, passando uma das validações que é a RequiredFieldValidation, ela é uma validação que valida se o campo é obrigatório ou não.
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    // Retornamos a instancia para continuar concatenando um metodo apos o outro. Tipo no zod, yup...
    return this
  }

  // Esse metodo faz o mesmo que o required, mas ele adiciona a validação de email ao array de validações, e retorna a instancia para continuar concatenando um metodo apos o outro.
  email() {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min(length: number) {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  sameAs(fieldToCompare: string) {
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare)
    )
    return this
  }

  build(): FieldValidation[] {
    // retorna o array de validações no final da construção. Quem vai consumir essa classe precisa dessa lista, no caso o composite. Então no final da construção, ele vai retornar essa lista de validações de cada campo que foi passado para ser validado.
    return this.validations
  }
}
