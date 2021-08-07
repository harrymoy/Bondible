import React from 'react'
import './Header.scss'
interface Props {
  text?: string
}

const Header: React.FC<Props> = () => {
  //console.log(window.Infinity)

  return (
    <nav>
      <div className="container">
        <h1 className="logo">Bondible</h1>
      </div>
    </nav>
  )
}

export default Header
