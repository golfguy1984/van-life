import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx";


function MainLayout() {

  return (
    <div className='main-site-wrapper'>
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
              <Link to="/host">Host</Link>
              <Link to="/about">About</Link>
              <Link to="/vans">Vans</Link>
              <Link to="/login"><RxAvatar/></Link>
            </nav>
        </header>
        <Outlet />
        <footer>
          <p>2023 #VANLIFE</p>
        </footer>
    </div>
  )
}

export default MainLayout