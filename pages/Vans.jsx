import React, { useEffect } from 'react'
import { Link, useSearchParams, useOutletContext } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners'

function Vans() {
    const [vans, setVans] = React.useState([])
    // const [loading, setLoading] = React.useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

const contextVans = useOutletContext().allVans

useEffect(() => {
if (contextVans) {
    setVans(contextVans)
    // setLoading(false)
}
}, [contextVans])

    const typeFilter = searchParams.get('type')
  
    const filteredVans = typeFilter
    ? vans.filter(van => van.type === typeFilter)
    : vans


    let vansEl = filteredVans.map(van => (
            <div key={van.id} className='van-tile'>
                <Link 
                    to={van.id}
                    state={{ search: searchParams.toString()}}
                    // state={{ search: `?${searchParams.toString()}` }}
                    >
                    <div className='image-container'>

                    <img src={van.imageUrl} />
                    </div>
                    <h1>{van.name}</h1>
                    <p>${van.price}<span>/day</span></p>
                    <div className={`van-type ${van.type} selected`}>{van.type}</div>
                </Link>
            </div>
    ))

    // if (loading) {
    //     return (
    //         <>
    //             <PacmanLoader className="loading"/>
    //         </>
    //     )
    // }


    return (
        <div className='vans-list-wrapper'>
            <h1>Explore our van options</h1>
            <div className='filter-options'>
                <button className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`} onClick={() => setSearchParams({type: "simple"})}>simple</button>
                <button className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`} onClick={() => setSearchParams({type: "luxury"})}>luxury</button>
                <button className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`} onClick={() => setSearchParams({type: "rugged"})}>rugged</button>
                {typeFilter && <button className="filter-clear" onClick={() => setSearchParams({})}>Clear filters</button>}
            </div>
            <div className='van-list'>
                {vansEl}
            </div>
        </div>
      )


}

export default Vans