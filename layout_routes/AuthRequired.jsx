import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../api'

function AuthRequired() {
  const [user, setUser] = useState({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  // const isLoggedIn = localStorage.getItem("loggedin")

if (!user) {
    return (
        <Navigate 
          to="login" 
          state={{message: "You must log in first"}}
          replace
    />)
}

  return (
    user && <Outlet />
  )
}

export default AuthRequired