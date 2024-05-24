export interface Validation {
  // Ele retorna uma string, que é o erro, caso não tenha erro ele retorna uma string vazia
  validate(filedName: string, input: object): string
}
