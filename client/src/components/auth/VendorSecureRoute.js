import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Home from '../common/Home'
import { userIsAuthenticated, getTokenFromLocalStorage } from '../helpers/auth'
import Vendor from '../vendor/Vendor'



const SecureVendorRoute = () => {

  const location = useLocation()

  const [profile, setProfile] = useState({})
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getProfile = async () => {

      try {
        const { data } = await axios.get(
          '/api/members/profile/',
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setProfile(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getProfile()
  }, [])

  useEffect(() => {
    // Triggers rerender with path change
  }, [location.pathname])

  userIsAuthenticated()
  return profile.is_vendor ?  <Vendor /> : <Home />
}

export default SecureVendorRoute