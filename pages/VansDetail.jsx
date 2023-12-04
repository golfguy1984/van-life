import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation, useOutletContext } from 'react-router-dom'
import { getVan } from '../api'
import { PacmanLoader } from 'react-spinners'

function VansDetail() {
const [van, setVan] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

const { id } = useParams()
const location = useLocation()
const contextVans = useOutletContext().allVans



useEffect(() => {
if (contextVans) {
    const contextVan = contextVans.filter(item => item.id === id)[0]
    setVan(contextVan)
    setLoading(false)
}
}, [contextVans])


// useEffect(() => {
//     async function loadVans() {
//         setLoading(true)
//         try {
//             const vanData = await getVan(id)
//             setVan(vanData)
//         } catch (err) {
//             setError(err)
//         } finally {
//             setTimeout(() => {
//                 setLoading(false);
//               }, 1500);
//         }
//     }
//     loadVans()
// }, [id])

const search = location.state?.search || ""

if (loading) {
    return (
        <>
            <PacmanLoader className="loading"/>
        </>
    )
}

if (error) {
    return <h1>There was an error: {error.message}</h1>
}

return (
    <> 
        <Link 
            to={`..?${search}`}
            relative='path'
            className='back-button'
        >&larr; back to vans</Link>
        {van &&
            <div className='van-detailed-wrapper'>
                <div className='image-container'>

                <img src={van.imageUrl} />
                </div>
                <div className={`van-type ${van.type} selected`}>{van.type}</div>
                <h1>{van.name}</h1>
                <p><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button>Rent this van</button>
            </div> 
        }
    </>
  )
}

export default VansDetail