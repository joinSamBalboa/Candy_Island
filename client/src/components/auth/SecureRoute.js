import React, { useEffect } from 'react'
import { userIsAuthenticated } from '../helpers/auth'
import { useLocation } from 'react-router-dom'
import Home from '../common/Home'
import Login from './Login'

const SecureRoute = () => {

  const location = useLocation()

  useEffect(() => {
    // Triggers rerender with path change
  }, [location.pathname])

  userIsAuthenticated()
  return userIsAuthenticated() ?  <Home /> : <Login />
}

export default SecureRoute