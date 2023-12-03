import React from 'react'
import { Outlet, Navigate, useOutletContext } from 'react-router-dom'


function AuthRequired() {


let context = useOutletContext()

console.log(context)

if (!context.user) {
    return (
        <Navigate 
          to="/" 
          state={{message: "You must log in first"}}
          replace
    />)
}

  return (
    context && <Outlet />
  )
}

export default AuthRequired