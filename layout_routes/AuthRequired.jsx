import React, { useEffect, useRef, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../api'

function AuthRequired() {
  const [user, setUser] = useState(localStorage.getItem("loggedIn"))

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
  })
}, [])


console.log(user)

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