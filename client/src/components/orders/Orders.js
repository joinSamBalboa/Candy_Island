import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'
import ReactPaginate from 'react-paginate'

const Orders = () => {



  const [orders, setOrders] = useState({})
  const [hasError, setHasError] = useState(false)

  const [currentPage, setCurrentPage] = useState(0)
  const perPage = 5
  const pageCount = Math.ceil(orders.length / perPage)
  const offset = currentPage * perPage

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setCurrentPage(selectedPage)
  }



  useEffect(() => {
    const getOrders = async () => {

      try {
        const { data } = await axios.get(
          '/api/members/profile/',
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setOrders(data.orders)
      } catch (error) {
        setHasError(true)
      }
    }
    getOrders()
  }, [])

  return (
    <div className="App margin-10 mt-3 mb-5 p-3">
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
        orders.length > 0 &&
        orders.slice(offset, offset + perPage).map(order => {
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
      }
    </div>
  )
}



export default Orders