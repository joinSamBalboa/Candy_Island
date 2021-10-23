import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory, useLocation } from 'react-router-dom'
import { getTokenFromLocalStorage, getPayload, userIsAuthenticated } from '../helpers/auth'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

const SingleListing = () => {

  const { id } = useParams()

  const history = useHistory()

  const location = useLocation()

  const [listing, setListing] = useState({})
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getListing = async () => {
      try {
        const { data } = await axios.get(
          `/api/listings/${id}`,
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setListing(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getListing()
  }, [id])

  const userIsOwner = (ownerId) => {
    const payload = getPayload()
    if (!payload) return
    return ownerId === payload.sub
  }

  const handleDeleteListing = async () => {
    try {
      await axios.delete(
        `/api/listings/${id}`,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push('/home')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container ">
      <div className="row">
        <div className="col-md-6">
          <img src={listing.image} alt={listing.image} className="image-responsive" />
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-12">
              <h1>{listing.name}</h1>
              <div className="col-md-12">
                {
                  listing.categories &&
                  listing.categories.map(category => {
                    console.log('Category->', category)
                    return <span key={category.id} className="badge badge-primary">{category.name}</span>
                  })
                }
                {/* <span className="">Sold by {listing.owner.username}</span> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <span className="">{
                listing.feedbacks > 0 &&
                listing.feedbacks.reduce((acc, feedback) => {
                  console.log(Number(listing.feedbacks.length))
                  return parseFloat(parseFloat((acc.rating + feedback.rating)) / parseFloat(listing.feedbacks.length))
                })
              }</span>
            </div>
            <div className="col-md-3">
              <span className="monospaced">Give Feedback</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 bottom-rule">
              <h2 className="product-price">£{listing.price}</h2>
            </div>
          </div>
          <div className="row add-to-cart">
            <div className="col-md-5 product-qty">
              <span className="btn btn-default btn-lg btn-qty">
                <span className="glyphicon glyphicon-plus"></span>
              </span>
              <input className="btn btn-default btn-lg btn-qty" value="1" />
              <span className="btn btn-default btn-lg btn-qty">
                <span className="glyphicon glyphicon-minus" ></span>
              </span>
            </div>
            <div className="col-md-4">
              <button className="btn btn-lg btn-brand btn-full-width">
                Buy Now
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 text-center">
              <span className="monospaced">
                {
                  listing.quantity ?
                    <p>In Stock</p>
                    :
                    <p>Out of Stock</p>
                }
              </span>
            </div>
            <div className="col-md-4 col-md-offset-1 text-center">
              <a className="monospaced" href="#">Add to Favourites</a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 bottom-rule top-10"></div>
          </div>
        </div>
        <div className="row">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Feedback</Tab>
            </TabList>
            <TabPanel><p>{listing.description}</p></TabPanel>
            <TabPanel>
              {
                listing.feedbacks > 0 &&
                listing.feedbacks.map(feedback => {
                  return <p key={feedback.id}>{feedback.text}</p>
                })
              }
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  )

}

export default SingleListing