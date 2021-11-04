import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'

import ImageUpload from '../helpers/ImageUpload'

const ProfileDetails = () => {

  const [formData, setFormData] = useState({
    username: '',
    is_vendor: false,
    btc_address: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setErrors({ ...errors, [event.target.name]: '' })
  }

  useEffect(() => {
    const getProfile = async () => {

      try {
        const { data } = await axios.get(
          '/api/members/profile/',
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setFormData(data)
      } catch (error) {
        setErrors(true)
      }
    }
    getProfile()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(
        '/api/members/profile/',
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      setFormData({ message: '' })
    } catch (error) {
      // if (error.response.data.errors) setErrors(error.response.data.errors)
    }
    
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Username</label>
        <input onInput={handleChange} name="username" type="username" className="form-control" placeholder="Enter username" value={formData.username} />
        {errors.username && <small className={errors.username}></small>}
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" name="is_vendor" value={formData.is_vendor} />
        <label className="form-check-label" htmlFor="exampleCheck1">Vendor</label>
      </div>
      <label className="control-label">Bitcoin address:</label>
      <div>
        <input type="text" className="form-control input-lg" name="btc_address" value={formData.btc_address}/>
      </div>
      <div className="form-group">
        <ImageUpload name="vendor_image" value={formData.vendor_image}/>
      </div>
      <button onSubmit={handleSubmit} type="submit" className="btn btn-primary">Edit details</button>
    </form>
  )

}

export default ProfileDetails