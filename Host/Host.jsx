import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { getLoggedInVans } from '../api'

function Host() {

  
  const [vans, setVans] = useState([])
  const [loading, setLoading] = useState(false)

  




useEffect(() => {
  async function loadVans() {
    setLoading(true)
    try {
      const data = await getLoggedInVans()
      setVans(data)
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
            <Link to=".">Dashboard</Link>
            <Link to="income">Income</Link>
            <Link to="vans">Vans</Link>
            <Link to="reviews">Reviews</Link>
        </nav>
        <Outlet context={vans}/>
    </>
  )
}

export default Host