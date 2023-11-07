import React, { useEffect, useState } from 'react'
import { getHostVans } from '../api'
import { Link } from 'react-router-dom'


function HostVans() {
const [vans, setVans] = useState([])
const [loading, setLoading] = useState(false)

//make api call to the server to get back only the vans of the logged in user
useEffect(() => {
async function loadVans() {
  setLoading(true)
  try {
    const data = await getHostVans()
    setVans(data)
  } catch(err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}
loadVans()

}, [])

let vansEl = vans.map(van => (
  <Link key={van.id} to={van.id}>
    <div className='host-vans-wrapper'>
      <img src={van.imageUrl} />
      <div>
        <h1>{van.name}</h1>
        <p>${van.price}/day</p>
      </div>
    </div>
  </Link>
))


if (loading) {
  return <h1>Loading...</h1>
}

  return (
    <div className='host-vans-main-container'>
      <h1>Your listed vans</h1>
      
        {vansEl}
   
    </div>
  )
}

export default HostVans