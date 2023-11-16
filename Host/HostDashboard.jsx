import React from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa6";
import { logOut } from '../api';


function HostDashboard() {

const {vans} = useOutletContext()


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
        <div className='dash-top-left'>
          <h2>Welcome!</h2>
          <p>Income last 30 days</p>
          <h1>$2,260</h1>
        </div>
        <div className='dash-top-right'>
          <p>details</p>
        </div>
      </div>
      <div className='host-dash-mid'>
        <p className='review-score'>Review Score<span><FaStar className='fa-star'/></span><span>5/5</span></p>
        <p className='details'>details</p>
      </div>
      <div className='host-dash-bottom'>
        <h3>Your listed vans</h3>
        <Link to="vans">View all</Link>
      </div>
      <div className='host-vans-main-container'>
        {vanEl}
      </div>
       <button className="logout-btn" onClick={logOut}>Log Out</button>
    </>
  )
}

export default HostDashboard