import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import 'friendly-challenge/widget'

const Register = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    listings: [],
    orders: [],
    favourites: [],
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    listings: [],
    orders: [],
    favourites: [],
  })

  //* Functions 
  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/members/register/', formData)
      setTokenToLocalStorage(data.token)
      history.push('/')
    } catch (error) {
      if (error.request.response) setErrors(error.request.response)
      console.log('Error ->', error.request.response)
    }
  }

  return (
    <div className="text-center">  
      <form onSubmit={handleSubmit} className="form-signin">
        <h1 className='h3 mb-3 font-weight-normal h1-white'>Register below</h1>
        <small className="small-form"><Link to='/login'>Or login here</Link></small>
        <div className="form-group">
          <input onInput={handleChange} name="username" type="username" className="form-control"  placeholder="Enter username"/>
          {errors.username && <small className={errors.username}></small>}
        </div>
        <div className="form-group">
          <input onInput={handleChange} name="password" type="password" className="form-control" placeholder="Enter password"/>
          {errors.password && <small className="form-text text-muted"></small>}
        </div>
        <div className="form-group">
          <input onInput={handleChange} name="password_confirmation" type="password" className="form-control" placeholder="Confirm Password"/>
          {errors && <small className="form-text text-muted">Please confirm password</small>}
        </div>
        {/* <div className="frc-captcha" data-sitekey="FCMMQDAM2AES5RRQ"></div> */}
        <button type="submit" className="btn btn-lg btn-primary btn-block mt-3">Register</button>
      </form>
    </div>
  )
}

export default Register