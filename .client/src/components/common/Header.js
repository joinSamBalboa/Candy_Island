import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { getTokenFromLocalStorage, userIsAuthenticated } from '../helpers/auth'
import logo from '../../assets/ISLAND.svg'

const Header = () => {


  const history = useHistory()

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


  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }


  return (
    <header className="py-3 border-bottom">
      <div className="d-flex flex-wrap justify-content-space-between align-items-center margin-10">
        <Link to='/' className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
          <span className="fs-4">Candy</span>
          <img src={logo} alt="logo" />
          <span className="fs-4">Island</span>
        </Link>
        {
          profile && userIsAuthenticated() &&
          <div className="d-flex align-items-center">
            <div className="image_inner_container">
              <Link to='/profile'><img src={profile.vendor_image} alt={profile.vendor_image} /></Link>
            </div>
            <div>
              <p className="p-header">Logged in as <Link to='/profile' className="profileName">{profile.username}</Link></p>
              <a onClick={handleLogout} className="nav-link link-dark px-2 logout">(<span className="profileName">Logout</span>)</a>
            </div>
          </div>
        }
      </div>
    </header>
  )

}

export default Header