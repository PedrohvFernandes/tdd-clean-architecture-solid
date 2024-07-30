import { RouterProvider } from 'react-router-dom'

import { ApiContextProvider } from './presentation/contexts/api/api-context'

import { Router } from './routes'

export function App() {
  return (
    <ApiContextProvider>
      <RouterProvider router={Router} />
    </ApiContextProvider>
  )
}
