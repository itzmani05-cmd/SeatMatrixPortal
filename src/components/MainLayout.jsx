import React from 'react'
import Footer from './Footer';

export const MainLayout = ({children}) => {
  return (
    <div>
        {children}
        <Footer/>
    </div>
  )
}
