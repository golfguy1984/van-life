import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../api'

function Host() {

const [user, setUser] = useState({})

onAuthStateChanged(auth, (currentUser) => {
  setUser(currentUser)
})



//pass user info through context? or pass context through the outlet

//useEffect that grabs loggedin users info and stores it in state?
//have access to userid above and can querey their collection of vans



  return (
    <>
        <nav className='host-page-nav'>
            <Link to=".">Dashboard</Link>
            <Link to="income">Income</Link>
            <Link to="vans">Vans</Link>
            <Link to="reviews">Reviews</Link>
        </nav>
        <Outlet context={[user, setUser]}/>
        <p>{user?.email}</p>
    </>
  )
}

export default Host