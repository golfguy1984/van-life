import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginUser } from '../api'

function Login() {
    
const [formData, setFormData] = useState({email: '', password: ''})
const [status, setStatus] = useState("idle")
const [error, setError] = useState(null)

const location = useLocation()
const navigate = useNavigate()


function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    loginUser(formData)
        .then(data => {
            setError(null)
            localStorage.setItem("loggedin", true)
            navigate('/host', {replace: true})
        }).catch(err => {
            setError(err)
        })
        .finally(() => {
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
        {location.state?.message && <h3>{location.state.message}</h3>}
        <h1>Sign into your account</h1>
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
    </div>
  )
}

export default Login