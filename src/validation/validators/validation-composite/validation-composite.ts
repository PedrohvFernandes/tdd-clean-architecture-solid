import { Validation } from '@/main/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols'

// Como dito antes o pai dos validadores não iria possuir a mesma interface dos filhos
export class ValidationComposite implements Validation {
  // O composite precisa de uma lista dos validadores, seus filhos
  constructor(private readonly validators: FieldValidation[]) {}

  validate(fieldName: string, fieldValue: string): string {
    // O composite precisa validar todos os filhos, caso algum deles falhe, ele precisa falhar também

    // Pegamos todos os validadores que possuem o mesmo nome do campo que estamos validando
    const validators = this.validators.filter((v) => v.fieldName === fieldName)
    // Fazemos um loop dos validadores e validamos o campo
    for (const validator of validators) {
      // Se o validador daquele campo retornar um erro com base no valor passado, retornamos o erro
      const error = validator.validate(fieldValue)
      if (error) {
        // A gente ja retorna a mensagem erro do validator em si, ja passa bonitinho para view
        return error.message
      }
    }
    // Se não retornamos vazio(null)
    return ''
  }
}
