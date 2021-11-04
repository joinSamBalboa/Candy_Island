import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'


const VendorOrders = () => {


  const [listings, setListings] = useState({})
  const [hasError, setHasError] = useState(false)

  const [currentPage, setCurrentPage] = useState(0)
  const perPage = 5
  const pageCount = Math.ceil(listings.length / perPage)
  const offset = currentPage * perPage

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setCurrentPage(selectedPage)
  }



  useEffect(() => {
    const getProfile = async () => {

      try {
        const { data } = await axios.get(
          '/api/members/profile/',
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setListings(data.listings)
      } catch (error) {
        setHasError(true)
      }
    }
    getProfile()
  }, [])

  return (
    <>
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
      />
      {
        listings.length > 0 &&
        listings.map(listing => {
          return listing.orders.slice(offset, offset + perPage).map(order => {
            console.log('Order ->', order)
            return <div key={order.id} className="card mb-4 order-card shadow p-3 flex-direction-row">
              <div className="card-body">
                <div className="small text-muted">Order created at {order.created_at}</div>
                <h2 className="card-title h4">Order #{order.id}</h2>
                <p className="card-text">Quantity: {order.quantity}</p>
                <p className="card-text">{order.listing.name}</p>
                <p className="card-text text-success">{order.status}</p>
                <Link className="btn btn-primary" to={`/orders/${order.id}`}>View order</Link>
              </div>
              <div>
                <img src={order.listing.image} alt={order.listing.image} />
              </div>
            </div>
          })
        })
      }
    </>
  )
}

export default VendorOrders