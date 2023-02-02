import React, { ReactNode } from 'react'
import Navbar from '../reusables/navbar'

const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto px-4 py-6 flex flex-col items-center'>{children}</div>
    </div>
  );
}

export default Layout