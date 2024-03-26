// Possíveis erros da nossa aplicação, que podem ser lançados em qualquer lugar da aplicação, e que a camada de UI vai colocar na tela e que o teste vai usar para validar se error é correto
import { InvalidCredentialsError } from './invalid-credentials-error'
import { UnexpectedError } from './unexpected-error'

export { InvalidCredentialsError, UnexpectedError }
