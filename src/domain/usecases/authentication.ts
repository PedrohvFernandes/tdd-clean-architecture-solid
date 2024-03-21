import { AccountModel } from 'domain/models'
/*
  Primeiro caso uso que vamos ter, a nossa regra de negocio, a nossa regra de autenticação  vai ser somente uma interface/abstração e vamos ter a implementação na layer de data

  A nossa rota de login precisa receber um email e uma senha

  E precisamos receber um token de acesso - objeto - Que vai conter os dados da conta do usuario, porem a rota que iremos trabalhar so espoem o token e não os dados da conta do usuario(todos os objetos)
*/

// Type alias, colocando os params em um objeto
type AuthenticationParams = {
  email: string
  password: string
}

// Basicamente a interface serve com um contrato, ela dita o que a classe que implementar ela precisa ter. Nesse caso:
/*
  Essa função é uma função async que retorna uma promise com os dados do usuario(AccountModel)
  Padronizamos o retorno AccountModel

  Authentication --> Uma abstração, que alguem vai implementar e que implementar precisa ter um metodo auth que recebe esses params e que retorne o accountmodel de forma async
*/
export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
}
