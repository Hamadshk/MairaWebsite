import React from 'react'
import Header from './Header'
import Footers from './Footers'
const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        
        <main>{children}</main>

        <Footers/>
    </div>
  )
}

export default Layout
