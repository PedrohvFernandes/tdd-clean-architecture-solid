import { RouterProvider } from 'react-router-dom'

import { ApiContextProvider } from './presentation/contexts/api/api-context'

import { Router } from './routes'

export function App() {
  return (
    <ApiContextProvider>
      {/*
        Tem duas maneiras de fazer as rotas privadas:
        1. Criar um componente PrivateRoute que verifica se o token está vazio e redireciona para a rota de login, e passar esse private route para o arquivo routes.tsx, que se a pessoa tentar entrar na rota que tem esse componente PrivateRoute e o token estiver vazio, ele redireciona para a rota que ja estava.

        2. Seria eu criar dois arquivos de rotas, um para rotas privadas e outro para rotas públicas(ex: routes-publics.tsx). E no arquivo de rotas privadas, eu verifico se o token está vazio e redireciono para a rota de login. E no arquivo de rotas publicas eu evito com essa verificação de token preenchido da pessoa por exemplo entrar na rota de login, retornando para a rota de home. E aqui no App.tsx eu passo os dois arquivos de rotas criando dois RouterProvider, um para rotas privadas e outro para rotas públicas, e tirar essa generalização que esta aqui agora.
      */}
      <RouterProvider router={Router} />
    </ApiContextProvider>
  )
}
