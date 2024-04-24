import { Validation } from '@/protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage = ''
  filedName: string = ''
  fieldValue: string = ''

  // por padrão retornamos o erro esse é objetivo principal do validate, para validar os campos do form, A diferença é que passamos o erro quando mockamos e não quando implementamos. Por exemplo no test login.spec.ts, que o erro ja é passado como padrão, bastando chamar o testStatusForField no spec do login e no login em si o validate no componente do input, passando o nome do input o seu valor
  validate(filedName: string, fieldValue: string): string {
    this.filedName = filedName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}
