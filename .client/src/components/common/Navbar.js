import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { userIsAuthenticated, getTokenFromLocalStorage } from '../helpers/auth'

const Navbar = () => {

  const history = useHistory()

  const location = useLocation()

  const [profile, setProfile] = useState({})
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Triggers rerender with path change
  }, [location.pathname])

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

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }
  return (
    <nav className="py-2 bg-light border-bottom d-flex justify-content-center">
      <div className="d-flex flex-wrap">
        {
          userIsAuthenticated() ?
            <>
              <ul className="nav me-auto ">
                <li className="nav-item"><Link to='/' className="nav-link link-dark px-2 active nav-hover">Home</Link></li>
                <li className="nav-item"><Link to='/orders' className="nav-link link-dark px-2 nav-hover">Orders</Link></li>
                {profile.is_vendor ?
                  <li className="nav-item"><Link to='/vendor' className="nav-link link-dark px-2 nav-hover">Vendor Page</Link></li>
                  :
                  <li className="nav-item"><Link to='/' data-bs-toggle='modal' data-bs-target='#ModalVendorForm' className="nav-link link-dark px-2 nav-hover">Become a vendor</Link></li>
                }
                <li className="nav-item"><Link to='/profile' className="nav-link link-dark px-2 nav-hover">Profile</Link></li>
                <li className="nav-item"><Link to='/about' className="nav-link link-dark px-2 nav-hover">About</Link></li>
              </ul>
              <ul className="nav">
                <li className="nav-item"><Link to='/search' className="nav-link link-dark px-2 nav-hover">Search</Link></li>
              </ul>
            </>
            :
            <>
              <ul className="nav me-auto">
                <li className="nav-item"><Link to='/about' className="nav-link link-dark px-2 nav-hover">About</Link></li>
              </ul>
              <ul className="nav">
                <li className="nav-item"><Link to='/login' className="nav-link link-dark px-2 nav-hover">Login</Link></li>
                <li className="nav-item"><Link to='/register' className="nav-link link-dark px-2 nav-hover">Register</Link></li>
              </ul>
            </>
        }
      </div>
    </nav>
  )

}

export default Navbar