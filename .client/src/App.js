import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { userIsAuthenticated } from './components/helpers/auth'

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

function App() {


  return (

    <BrowserRouter>
      <VendorModal />
      <Header />
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <SecureRoute path='/home' />
        </Route>
        <Route exact path='/login'>
          <Login />
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
        <Route exact path='/vendor'>
          <SecureVendorRoute />
        </Route>
        <Route exact path='/orders/:id'>
          <Order />
        </Route>
        <Route exact path='/orders'>
          <Orders /> 
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
