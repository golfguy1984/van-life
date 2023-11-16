import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'


function HostVans() {

const {vans} = useOutletContext()


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


  return (
    <div className='host-vans-main-container'>
      <h1>Your listed vans</h1>
      
        {vansEl}
   
    </div>
  )
}

export default HostVans