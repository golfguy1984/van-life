import React, { useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { getHostIncome, getLoggedInVans } from '../api'

function Host() {

  
const [vans, setVans] = useState([])
const [loading, setLoading] = useState(false)
const [income, setIncome] = useState([])

  
const activeStyle =  {
  textDecoration: "underline",
  color:  "#161616",
  fontWeight: "700"
}



useEffect(() => {
  async function loadVans() {
    setLoading(true)
    try {
      const data = await getLoggedInVans()
      const income = await getHostIncome()
      setVans(data)
      setIncome(income)
    } catch(err) {
      console.log(err)
    } finally {
    setLoading(false)  
    }
  }

  loadVans()
  
}, [])


if (loading) {
  return <h1>loading...</h1>
}



  return (
    <>
        <nav className='host-page-nav'>
            <NavLink 
              to="."
              end
              style={({isActive}) => isActive ? activeStyle : null}
            >
                Dashboard
            </NavLink>
            <NavLink 
              to="income"
              style={({isActive}) => isActive ? activeStyle : null}
            >Income
            </NavLink>
            <NavLink 
              to="vans"
              style={({isActive}) => isActive ? activeStyle : null}
            >Vans
            </NavLink>
            <NavLink 
              to="reviews"
              style={({isActive}) => isActive ? activeStyle : null}
            >Reviews
            </NavLink>
        </nav>
        <Outlet context={{vans, income}}/>
    </>
  )
}

export default Host