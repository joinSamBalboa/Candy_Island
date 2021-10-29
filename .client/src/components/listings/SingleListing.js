import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage, getPayload } from '../helpers/auth'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ReactStars from 'react-rating-stars-component'
import OrderModal from '../orders/OrderModal'
import FeedbackModal from '../feedback/FeedbackModal'

const SingleListing = () => {

  const { id } = useParams()

  const history = useHistory()

  const [listing, setListing] = useState({
  })
  const [hasError, setHasError] = useState(false)


  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const getListing = async () => {
      try {
        const { data } = await axios.get(
          `/api/listings/${id}`,
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setListing(data)
        setSubmitted(false)
      } catch (error) {
        setHasError(true)
      }
    }
    getListing()
  }, [id, submitted])





  const userIsOwner = (ownerId) => {
    const payload = getPayload()
    if (!payload) return
    return ownerId === payload.sub
  }

  const [starsRating, setStarsRating] = useState(listing.feedbacks && listing.feedbacks.reduce((acc, feedback) => {
    return (acc + feedback.rating) / listing.feedbacks.length
  }, 0))

  console.log(starsRating)



  return (
    <>
      <OrderModal listing={listing} id={listing.id} setSubmitted={setSubmitted} />
      <FeedbackModal listing={listing} id={listing.id} setSubmitted={setSubmitted} />
      <div className="container rounded card mt-5 mb-6 shadow">
        <div className="row">
          <div className="col-md-6 d-flex">
            <img src={listing.image} alt={listing.image} className="image-responsive" />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <h1 className="fw-bolder-color">{listing.name}</h1>
                <div className="col-md-12">
                  {
                    listing.categories &&
                    listing.categories.map(category => {
                      return <span key={category.id} className="badge">{category.name}</span>
                    })
                  }
                </div>

              </div>

            </div>

            <div className="row">
              <div className="col-md-3">
                <ReactStars
                  value = {starsRating}
                  size={20}
                  edit={false}
                  isHalf={true}
                  count={5} />
              </div>
              <div className="col-md-3">
                <span className="monospaced" data-bs-toggle='modal' data-bs-target='#ModalFeedbackForm'>Give Feedback</span>
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
            </div>
            <div className="row">
              <div className="col-md-12 bottom-rule top-10"></div>
            </div>
          </div>
          <div className="mt-5">
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
                    return <div key={feedback.id}>
                      <li className="list-unstyled">
                        <div className="reviewHeader">
                          <img src={feedback.owner.vendor_image} className="reviewImage" alt={feedback.owner.vendor_image} />
                          <p><strong>By {feedback.owner.username}</strong></p>
                        </div>
                        <ReactStars
                          value={feedback.rating}
                          size={20}
                          edit={false}
                          isHalf={true}
                          count={5}
                        />
                        <p>{feedback.text}</p>
                      </li>
                      <hr />
                    </div>
                  })
                }
              </TabPanel>
              <TabPanel>{listing.weight}g</TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
      {/* <div className="container mt-5 mb-5">
        {listing.owner.id ===  &&
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
      </div> */}
    </>
  )

}

export default SingleListing