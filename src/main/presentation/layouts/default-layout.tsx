import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/footer'
import { LoginHeader } from '@/components/headers'

export function DefaultLayout() {
  return (
    // <div className='relative'>
    <>
      {/* <div className="container"> */}
      {/* <div className="w-full max-w-[70rem] mx-auto min-h-screen pt-20"> */}
      <div className="flex flex-col justify-between  min-h-screen gap-12">
        <LoginHeader />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
