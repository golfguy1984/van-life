import React, {useState, useEffect} from 'react'
import { Outlet, Link } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx";
import { auth, getAllVans } from '../api';
import { onAuthStateChanged } from 'firebase/auth'


function MainLayout() {
  const [user, setUser] = useState(localStorage.getItem("loggedIn"))
  const [allVans, setAllVans] = useState(null)

useEffect(() => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
})
}, [])

useEffect(() => {
  async function loadvans() {
    try {
      const data = await getAllVans()
      setAllVans(data)
    } catch (err) {
      console.log(err)
    }
  }
  
  loadvans()
}, [])



// let test = localStorage.getItem("loggedIn")

  return (
    <div className='main-site-wrapper'>
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav className='main-nav'>
              {user && <Link to="/host">Host</Link>}
              <Link to="/about">About</Link>
              <Link to="/vans">Vans</Link>
              <Link to="/login"><RxAvatar/></Link>
            </nav>
        </header>
        <Outlet context={{user, allVans}}/>
        <footer>
          <p>2023 #VANLIFE</p>
        </footer>
    </div>
  )
}

export default MainLayout