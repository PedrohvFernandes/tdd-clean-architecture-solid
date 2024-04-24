// Esse protocolo aqui so é especifico para a camada de validation por conta do composite de validação decidimos separar da interface principal que é a validation que esta na camada de apresentação, logo ele é so um detalhe interno dessa camada aqui(validation) para o composite
export interface FieldValidation {
  fieldName: string
  validate(fieldValue: string): Error | null
}
