import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/footer'
import { LoggedHeader } from '@/components/headers'

export function DefaultLayoutLogged() {
  return (
    <div className="flex flex-col justify-between min-h-[100vh] bg-disabled-background">
      <LoggedHeader />
      <Outlet />
      <Footer />
    </div>
  )
}
