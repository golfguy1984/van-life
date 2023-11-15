import React from 'react'
import { useOutletContext } from 'react-router-dom'

function HostVansInfo() {
const { currentVan } = useOutletContext()

  return (
    <div className='host-vans-info-container'>
      <p><span>Name:</span> {currentVan.name}</p>
      <p><span>Catagory:</span> {currentVan.type}</p>
      <p><span>Description:</span> {currentVan.description}</p>
      <p><span>Visibility:</span> Public</p>
    </div>
  )
}

export default HostVansInfo