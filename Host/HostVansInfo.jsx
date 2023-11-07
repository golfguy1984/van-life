import React from 'react'
import { useOutletContext } from 'react-router-dom'

function HostVansInfo() {
const { currentVan } = useOutletContext()

  return (
    <div>
      <p>Name: {currentVan.name}</p>
      <p>Catagory: {currentVan.type}</p>
      <p>Description: {currentVan.description}</p>
      <p>Visibility: Public</p>
    </div>
  )
}

export default HostVansInfo