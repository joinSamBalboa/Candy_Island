import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory, useLocation } from 'react-router-dom'
import { getTokenFromLocalStorage, getPayload } from '../helpers/auth'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ReactStars from 'react-rating-stars-component'
import OrderModal from '../orders/OrderModal'

const SingleListing = () => {

  const { id } = useParams()

  const history = useHistory()

  const location = useLocation()

  const [listing, setListing] = useState({})
  const [hasError, setHasError] = useState(false)


  const starsRating =
    listing.feedbacks > 0 ?
      listing.feedbacks.reduce((acc, feedback) => {
        return parseFloat(parseFloat((acc.rating + feedback.rating)) / parseFloat(listing.feedbacks.length))
      })
      :
      0

  const rating = {
    size: 20,
    edit: false,
    value: starsRating,
    isHalf: true,
    count: 5,
  }

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


  useEffect(() => {
    // Triggers rerender with path change
  }, [location.pathname])

  return (
    <>
      <OrderModal listing={listing} id={listing.id} />
      <div className="margin-10 rounded card mt-5 mb-6 shadow">
        <div className="row">
          <div className="col-md-6 d-flex">
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
                      return <span key={category.id} className="badge badge-primary">{category.name}</span>
                    })
                  }
                  {/* <span className="">Sold by {listing.owner.username}</span> */}
                </div>

              </div>

            </div>

            <div className="row">
              <div className="col-md-3">
                <ReactStars {...rating} />
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
            <hr />
            <div className="row add-to-cart">


              <div className="col-md-4">
                <button type='button' className="btn btn-lg btn-primary btn-block" data-bs-toggle='modal' data-bs-target='#ModalOrderForm'>
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
                <Tab>Weight</Tab>
              </TabList>
              <TabPanel><p>{listing.description}</p></TabPanel>
              <TabPanel>
                {
                  listing.feedbacks &&
                  listing.feedbacks.map(feedback => {
                    return <p key={feedback.id}>{feedback.text}</p>
                  })
                }
              </TabPanel>
              <TabPanel>{listing.weight}g</TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="margin-10 mt-5 mb-5">
        {listing.owner &&
          listing.orders.map(order => {
            return <div key={order.id} className="card mb-4 order-card shadow p-3">
              <div className="card-body">
                <div className="small text-muted">Order created at {order.created_at}</div>
                <h2 className="card-title h4">Order #{order.id}</h2>
                <p className="card-text">Quantity: {order.quantity}</p>
                <p className="card-text">Order made by: {order.owner.name}</p>
                <Link className="btn btn-primary" to={`/orders/${order.id}`}>View order</Link>
              </div>
            </div>
          })}
      </div>
    </>
  )

}

export default SingleListing