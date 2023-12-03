import React, { useEffect, useRef, useState } from 'react'
import { Outlet, Navigate, useOutletContext } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../api'

function AuthRequired() {
//   const [user, setUser] = useState(localStorage.getItem("loggedIn"))

//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser)
//   })
// }, [])

let context = useOutletContext()

console.log(context)

if (!context.user) {
    return (
        <Navigate 
          to="login" 
          state={{message: "You must log in first"}}
          replace
    />)
}

  return (
    context && <Outlet />
  )
}

export default AuthRequired