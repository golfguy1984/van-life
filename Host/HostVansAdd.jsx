import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { addVan } from '../api'

function HostVansAdd() {

const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        type: "",
        imageUrl: ''
      })
const [submitting, setSubmitting] = useState(false)      
const [submitted, setSubmitted] = useState(false)

async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    await addVan(formData)
    setFormData({
        name: "",
        price: "",
        description: "",
        type: "",
        imageUrl: '',
    })
    setSubmitting(false)
    setSubmitted(true)
    }

function handleChange(e, fieldName) {
setFormData(prev => ({ ...prev, [fieldName]: e.target.value }));
}    

  return (
    <>
    {submitted && <button onClick={() => setSubmitted(false)}>van added - add another one?</button>}
    <NavLink to=".." relative='path' className="back-button back-button-details">&larr; back to all vans</NavLink>
    {!submitted && <form onSubmit={handleSubmit} className='add-van-form'>
        <input value={formData.name} required type='text' placeholder="van name" onChange={(e) => handleChange(e, 'name')} />
        <input value={formData.price} required type='number' placeholder="price: $60" onChange={(e) => handleChange(e, 'price')} />
        <textarea value={formData.description} required onChange={(e) => handleChange(e, 'description')}></textarea> 
        <select value={formData.type} required onChange={(e) => handleChange(e, 'type')}>
        <option>---Choose One---</option>
          <option value="simple">Simple</option>
          <option value="luxury">Luxury</option>
          <option value="rugged">Rugged</option>
        </select>
        <input value={formData.imageUrl} required type='text' placeholder="img url" onChange={(e) => handleChange(e, 'imageUrl')} />
        <button className="logout-btn" type="submit" >{submitting ? "submitting..." : "submit"}</button>
      </form>}
    </>
  )
}

export default HostVansAdd