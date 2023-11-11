import React, { useEffect, useState} from 'react'
import { Outlet, useParams, NavLink } from 'react-router-dom'
import { getHostVan } from '../api'
import { PacmanLoader } from 'react-spinners'

function HostVansDetail() {
  const [currentVan, setCurrentVan] = useState(null)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  //make another call to the db to get the info for the specific van

useEffect(() => {
  async function loadVan() {
  setLoading(true)
  try {
    const data = await getHostVan(id)
    setCurrentVan(data)
  } catch(err) {
    console.log(err)
  } finally {
    setTimeout(() => {setLoading(false)}, 1500)
  }}
  loadVan()
}, [id])


if (loading) {
  return <PacmanLoader />
} 

  return (
    <>
    <NavLink to=".." relative='path' className="back-button">&larr; back to all vans</NavLink>
    <div className='host-van-detail-container'>
      {currentVan && 
        <>
        <div className="host-van-detail-top">
          <img src={currentVan.imageUrl} />
          <div className='host-van-detail-right'>
            <div className={`van-type ${currentVan.type} selected host-van-detail-badge`}>{currentVan.type}</div>
            <h3>{currentVan.name}</h3>
            <p>${currentVan.price}/day</p>
          </div>
        </div>
        <nav className='host-details-nav'>
          <NavLink className="detail-btn" to=".">Details</NavLink>
          <NavLink to="pricing">Pricing</NavLink>
          <NavLink to="photos">Photos</NavLink>
        </nav>
        <Outlet context={{ currentVan }}/>
        </>
        }
    </div>
    </>
  )
}

export default HostVansDetail