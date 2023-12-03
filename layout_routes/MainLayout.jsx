import React, {useState, useEffect} from 'react'
import { Outlet, Link } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx";
import { auth, getAllVans } from '../api';
import { onAuthStateChanged } from 'firebase/auth'
//import auth
//impor useState and useEffect

// raise the useEffect and user state to here and then pass as context to authrequired

function MainLayout() {
  const [user, setUser] = useState(localStorage.getItem("loggedIn"))
  const [vans, setVans] = useState(null)

useEffect(() => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
})
}, [])

// useEffect(() => {
//   async function loadvans() {
//     try {
//       const data = await getAllVans()
//       setVans(data)
//     } catch (err) {
//       console.log(err)
//     }
//   }
  
//   loadvans()
// }, [])



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
        <Outlet context={{user}}/>
        <footer>
          <p>2023 #VANLIFE</p>
        </footer>
    </div>
  )
}

export default MainLayout