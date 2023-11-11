import React from 'react'
import { useOutletContext, Link } from 'react-router-dom'

function HostDashboard() {

const vans = useOutletContext()


const vanEl = vans.map(van => (
    <Link key={van.id} to={`/vans/${van.id}`}>
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
    <>
      <div className='host-dash-top'>
        <div>
          <h2>Welcome!</h2>
          <p>Income last 30 days</p>
          <h1>$2,260</h1>
        </div>
        <div>
          <p>details</p>
        </div>
      </div>
      <div className='host-dash-mid'>
        <p>Review Scoer<span>star icon</span><span>5/5</span></p>
        <p>details</p>
      </div>
      <div className='host-vans-main-container'>
        <h3>Your listed vans</h3>
        <Link to="vans">View all</Link>
        {vanEl}
      </div>
    </>
  )
}

export default HostDashboard