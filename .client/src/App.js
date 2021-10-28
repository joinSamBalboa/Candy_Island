import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { getTokenFromLocalStorage } from './components/helpers/auth'
import axios from 'axios'

//* Components
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Header from './components/common/Header'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './components/common/Home'
import SecureRoute from './components/auth/SecureRoute'
import Search from './components/listings/Search'
import SingleListing from './components/listings/SingleListing'
import VendorModal from './components/vendor/VendorModal'
import SecureVendorRoute from './components/auth/VendorSecureRoute'
import Order from './components/orders/Order'
import Orders from './components/orders/Orders'
import Profile from './components/profile/Profile'
import SearchCategory from './components/listings/SearchCategory'

function App() {



  const [profile, setProfile] = useState({})
  const [hasError, setHasError] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true)

  


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
    if (loggedIn) getProfile()
  }, [loggedIn])



  return (

    <BrowserRouter>
      <VendorModal />
      <Header profile={profile} hasError={hasError} setProfile={setProfile} setLoggedIn={setLoggedIn}/>
      <Navbar profile={profile} hasError={hasError} />
      <Switch>
        <Route exact path='/'>
          <SecureRoute path='/home' />
        </Route>
        <Route exact path='/login'>
          <Login setLoggedIn={setLoggedIn} />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/search'>
          <Search />
        </Route>
        <Route exact path='/search/:id'>
          <SingleListing />
        </Route>
        <Route exact path='/category/:name'>
          <SearchCategory />
        </Route>
        <Route exact path='/vendor'>
          <SecureVendorRoute />
        </Route>
        <Route exact path='/orders/:id'>
          <Order />
        </Route>
        <Route exact path='/orders'>
          <Orders />
        </Route>
        <Route exact path='/profile'>
          <Profile />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
