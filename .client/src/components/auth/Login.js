import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import 'friendly-challenge/widget'

const Login = () => {

  const history = useHistory()

  const location = useLocation()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    login_time: 1,
    // listings: [],
    // orders: [],
    // favourites: [],
  })

  const [errors, setErrors] = useState({
    detail: '',
  })

  useEffect(() => {
    // Triggers rerender with path change
  }, [location.pathname])

  //* Functions 
  const handleChange = (event) => {
    const newObj = event.target.name === 'login_time' ? { ...formData, [event.target.name]: parseInt(event.target.value) } : { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/members/login/', formData)
      setTokenToLocalStorage(data.token)
      history.push('/')
    } catch (error) {
      // if (error.request.response) setErrors(error.request.response)
      console.log(errors)
    }
  }

  const one = 1
  const three = 3
  const six = 6
  const twelve = 12
  const day = 24

  return (
    <div className="text-center">  
      <form onSubmit={handleSubmit} className="form-signin">
        <h1 className='h3 mb-3 font-weight-normal h1-white'>Login below</h1>
        <small className="small-form"><Link to='/register'>Or register here</Link></small>
        <div className="form-group">
          <input onInput={handleChange} name="username" type="username" className="form-control"  placeholder="Enter username"/>
        </div>
        <div className="form-group">
          <input onInput={handleChange} name="password" type="password" className="form-control" placeholder="Enter password"/>
          {/* {errors && <small className="form-text text-muted">Invalid username/password combination</small>} */}
        </div>
        <div className="form-group">
          <select onInput={handleChange} id="inputState" name="login_time" className="form-control">
            <option selected value={one}>Stay logged in for 1 hour</option>
            <option value={three}>Stay logged in for 3 hours</option>
            <option value={six}>Stay logged in for 6 hours</option>
            <option value={twelve}>Stay logged in for 12 hours</option>
            <option value={day}>Stay logged in for 1 day</option>
          </select>
        </div>
        {/* <div className="frc-captcha" data-sitekey="FCMMQDAM2AES5RRQ"></div> */}
        <button type="submit" className="btn btn-lg btn-primary btn-block mt-3">Login</button>
      </form>
    </div>
  )
}

export default Login