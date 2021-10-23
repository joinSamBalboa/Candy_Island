import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/auth'

const Navbar = () => {

  const history = useHistory()

  const location = useLocation()

  useEffect(() => {
    // Triggers rerender with path change
  }, [location.pathname])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }
  return (
    <nav className="py-2 bg-light border-bottom">
      <div className="container d-flex flex-wrap">
        { 
          userIsAuthenticated() ?
            <>
              <ul className="nav me-auto">
                <li className="nav-item"><Link to='/' className="nav-link link-dark px-2 active nav-hover">Home</Link></li>
                <li className="nav-item"><a href="#" className="nav-link link-dark px-2 nav-hover">Orders</a></li>
                <li className="nav-item"><a href="#" className="nav-link link-dark px-2 nav-hover">Become a vendor</a></li>
                <li className="nav-item"><a href="#" className="nav-link link-dark px-2 nav-hover">Profile</a></li>
                <li className="nav-item"><a href="#" className="nav-link link-dark px-2 nav-hover">About</a></li>
              </ul>
              <ul className="nav">
                <li className="nav-item"><Link to='/search' className="nav-link link-dark px-2 nav-hover">Search</Link></li>
              </ul>
            </>
            :
            <>
              <ul className="nav me-auto">
                <li className="nav-item"><a href="#" className="nav-link link-dark px-2 nav-hover">About</a></li>
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