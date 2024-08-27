import { InputHTMLAttributes, useEffect } from 'react'

import { InputForm } from './input-form'

import { useHookForm } from '@/main/hooks'
import { useHookErrorState } from '@/main/hooks/use-hook-error-state-context'
import { Validation } from '@/protocols/validation'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  validation: Validation
}

export function InputFormLogin({ validation, ...propsInput }: InputFormProps) {
  const { setEmailError, setPasswordError } = useHookErrorState()

  const formData = useHookForm()

  const { email, password } = formData

  useEffect(() => {
    // Usamos o validation passado pelo login para validar o campo. o ValidationSpy é passado pelo teste login.spec e o validation implementado pelo MakeLogin em factories para o InputFormLogin que valida os campos do schema definido para o composite em factories passado para o login. Atraves desse schema passado para o composite com os respectivos nomes dos fields(campos) conseguimos validar usando o validate do validation que é justamente o composite. Por isso mesmo nome colocado do field aqui tem que ser o mesmo colocado no make do composite em facotires.
    // Dentro do formData tem email, password, name... ao passar o objeto formData para o validate, todo o processo por tras pega para cada validação o nome do campo que foi passado ex:'email' que vai servir como chave para pegar o formData que é um objeto que tem as chaves name, email, password... que nada mas é que useStates do react que tem valores. formData[email] = 'email@gmail.com' pega esse valor desse campo e faz as validações necessárias que foram passadas no schema do composite pelo make do login em factories e que foi passado para o InputFormLogin. Para entender melhor faça uma engenharia reversa do fluxo de dados e veja como o composite é chamado e como ele é passado para o InputFormLogin e como ele é usado para validar os campos do form.
    const errorMessage = validation.validate('email', formData)
    setEmailError(errorMessage)
  }, [email])

  useEffect(() => {
    const errorMessage = validation.validate('password', formData)
    setPasswordError(errorMessage)
  }, [password])

  return <InputForm {...propsInput} />
}
