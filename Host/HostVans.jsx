import React, { useEffect, useState } from 'react'
import { getHostVan } from '../api'


function HostVans() {
const [vans, setVans] = useState([])
const [loading, setLoading] = useState(false)

//make api call to the server to get back only the vans of the logged in user
useEffect(() => {
async function loadVans() {
  setLoading(true)
  try {
    const data = await getHostVan()
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
  <div>
    {van.name}
  </div>
))


if (loading) {
  return <h1>Loading...</h1>
}

  return (
    <div>{vansEl}</div>
  )
}

export default HostVans