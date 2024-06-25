import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

export function makeSignupValidation(): ValidationComposite {
  // Nós pegamos os itens de cada array(validador de cada campo) e jogamos dentro de um novo array, e retornamos esse novo array com as validações de cada campo. O required é um função que tem uma outra função e essa função ela é jogada dentro de um array e retornada, e assim por diante, vai concatenando um no outro até chegar no final e retornar um array com todas as validações de todos os campos, ou seja o metodo build faz isso, por isso fazemos um spread operator para pegar todos os itens do array e jogar dentro de um novo array. Então cada campo possui um array de validações(metodos). E são esses metodos dentro do array que são concatenados e retornados no final para que possam ser usados no composite. Dentro do composite ele vai pegar esses arrays e fazer a validação de cada campo, e se algum falhar ele vai retornar o erro, senão ele retorna vazio. Para testar, basta chamar o metodo validate do composite passando o campo e o objeto que contem o campo e o valor, e ele vai retornar o erro ou vazio. Chamamos ele no componente de input, e passamos o nome e o campo, e ele vai retornar o erro ou vazio, e assim por diante. Ao chamar o validate do composite, o composite vai chamar o validate do campo que esta sendo validado através do nome, e dentro do validate do campo é comparado o valor daquele input(input[this.fieldName]) passando o input que foi passado para o validate do composite. Para entender melhor faz um engenharia reversa, e vai seguindo o fluxo de chamadas dos metodos, De Input-form-signup>signup>signup-factory>signup-validation-factory>validation-composite>validation-builder>required>min>email>sameAs>build>validate. E assim por diante.
  return ValidationComposite.build([
    // Para esse array são 4 validações, para o campo name
    ...Builder.field('name').required().min(5).build(),
    // Para esse array são 4 validações, para o campo email
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passwordConfirmation')
      .required()
      .min(5)
      .sameAs('password')
      .build()
  ])
}
