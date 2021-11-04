import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, Link, useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'


const Home = () => {

  const history = useHistory()

  const [listings, setListings] = useState([])
  const [profile, setProfile] = useState({})
  const [hasError, setHasError] = useState(false)
  const [categories, setCategories] = useState([])

  

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          '/api/listings/',
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        console.log(data)
        setListings(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const getProfile = async () => {

      try {
        const { data } = await axios.get(
          '/api/members/profile/',
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setProfile(data)
        console.log(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getProfile()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          '/api/categories/',
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        console.log(data)
        setCategories(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getData()
  }, [])

  const searchClick = async () => {
    history.push('/search')
  }

  useLocation()

  return (
    <>

      <div className="margin-10">
        <div className="text-center my-5">
          <h1 className="fw-bolder-color ">Welcome, {profile.username}</h1>
          <p className="lead ">Feel free to browse the random listings or search for what you&apos;re looking for</p>
        </div>
      </div>


      <div className="ml-3 mr-3 margin-10">
        <div className="row">
          <div className="col-lg-8">


            {listings.length > 0 &&
              listings.sort(() => 0.5 - Math.random()).slice(0, 4).map(listing => {
                return <div key={listing.id} className="card mb-4 listing-card shadow">
                  <Link to={`/search/${listing.id}`}><img className="card-img-top" src={listing.image} alt="..." /></Link>
                  <div className="card-body">
                    <h2 className="card-title h4 fw-bolder-color">{listing.name}</h2>
                    <p className="small">Sold by {listing.owner.username}</p>
                    <p className="card-text">{listing.description.substring(0, 200)}...</p>
                    <h3>£{listing.price}</h3>
                    <Link className="btn btn-primary" to={`/search/${listing.id}`}>View Listing</Link>
                  </div>
                </div>
              })
            }
          </div>
          <div className="col-lg-4">
            <div className="card mb-4 shadow">
              <div className="card-header">Search</div>
              <div className="card-body">
                <div onClick={searchClick} className="input-group">
                  <input className="form-control" type="text" placeholder="Search Listings" />
                  <button className="btn btn-primary" id="button-search" type="button">Search!</button>
                </div>
              </div>
            </div>
            <div className="card mb-4 shadow">
              <div className="card-header">Categories</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <ul className="list-unstyled mb-0">
                      {categories.length > 0 &&
                        categories.slice(0, 6).map(category => {
                          return <li key={category.id}><Link to={`/category/${category.name}`}>{category.name}</Link></li>
                        })
                      }
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <ul className="list-unstyled mb-0">
                      {categories.length > 0 &&
                        categories.slice(6, 12).map(category => {
                          return <li key={category.id}><Link to={`/category/${category.name}`}>{category.name}</Link></li>
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Home