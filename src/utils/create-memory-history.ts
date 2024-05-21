import { Update } from 'history'

type countQuantityRouteType = {
  location?: Update
  replace?: boolean
}

// Como tivemos que instalar a lib https://www.npmjs.com/package/history Eles não possuem o length como o history nativo, então tive que criar uma variavel para armazenar a quantidade de rotas visitadas. Poderia usar o window.history.length mas ele não pega a quantidade exata. https://github.com/remix-run/history/issues/960
// Inicialmente
let quantityRoutes = 0

// Lista para armazenar as rotas visitadas
const routesVisited: string[] = []

// Se não passar nada é porque quer saber a quantidade de rotas visitadas
export const countQuantityRoute = ({
  location,
  replace
}: countQuantityRouteType) => {
  if (replace) {
    // Se for para substituir a rota atual, remove a última rota visitada
    routesVisited.pop()
    quantityRoutes = routesVisited.length
    return { quantityRoutes, routesVisited }
  }

  if (location === undefined) return { quantityRoutes, routesVisited }

  // Se a nova localização não estiver na lista, adiciona
  if (!routesVisited.includes(location.location.pathname)) {
    routesVisited.push(location.location.pathname)
    quantityRoutes = routesVisited.length
  }

  return {
    quantityRoutes,
    routesVisited
  }
}
