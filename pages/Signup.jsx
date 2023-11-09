import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api'


function Signup() {
const [status, setStatus] = useState('idle')
const [formData, setFormData] = useState({email: '', password: ""}) 
const [error, setError] = useState(null)   

const navigate = useNavigate()
//this should navigate the user to the host page with all of their information or prompts to set up their account by adding new vans

function handleSubmit(e) {
    e.preventDefault()
    setStatus("submitting")
    register(formData)
        .then(data => {
            setError(null)
            navigate('/', {replace: true})
        }).catch(err => {
            setError(err)
        }).finally(() => {
            setStatus('idle')
        })
}



function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
        ...prev,
        [name]: value
    }))
    }    


  return (
    <div className='login-container'>
        {/* {location.state?.message && <h3>{location.state.message}</h3>} */}
        <h1>Create an account</h1>
        {error?.message && <h3>{error.message}</h3>}
        <form onSubmit={handleSubmit} className='login-form'>
            <input 
                name="email"
                type="email" 
                placeholder='Email Address'
                onChange={handleChange}
            />
            <input 
                name="password"
                type="password" 
                placeholder='Password'
                onChange={handleChange}   
            />
            <button 
                className='link-button'
                disabled={status === "submitting"}
            >
                {status === "submitting" ? "Logging in..." : "Log in"}
            </button>
        </form>
        <h4>Already have an account? <Link to="/login">Log in now</Link></h4>
        
    </div>
  )
}

export default Signup