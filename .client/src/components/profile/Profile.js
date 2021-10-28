import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'
import ReactPaginate from 'react-paginate'


import Orders from '../orders/Orders'
import ProfileDetails from './ProfileDetails'

const Profile = () => {

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
    <div className="row">
      <div className="col-md-3">
        {/* <!-- Tabs nav --> */}
        <div className="nav flex-column nav-pills nav-pills-custom" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a className="btn btn-lg btn-primary btn-block shadow mb-3" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
            <span className="font-weight-bold small text-uppercase">Details</span></a>

          <a className="btn btn-lg btn-primary btn-block shadow mb-3" id="v-pills-pending-tab" data-bs-toggle="pill" data-bs-target="#v-pills-pending" role="tab" aria-controls="v-pills-profile" aria-selected="false">
            <span className="font-weight-bold small text-uppercase">Pending orders</span></a>

          <a className="btn btn-lg btn-primary btn-block shadow mb-3" id="v-pills-shipped-tab" data-bs-toggle="pill" data-bs-target="#v-pills-shipped" role="tab" aria-controls="v-pills-profile" aria-selected="false">
            <span className="font-weight-bold small text-uppercase">Shipped orders</span></a>

          <a className="btn btn-lg btn-primary btn-block shadow mb-3" id="v-pills-completed-tab" data-bs-toggle="pill" data-bs-target="#v-pills-completed" role="tab" aria-controls="v-pills-profile" aria-selected="false">
            <span className="font-weight-bold small text-uppercase">Completed orders</span></a>

        </div>
      </div>
      <div className="col-md-9">
        {/* <!-- Tabs content --> */}
        <div className="tab-content" id="v-pills-tabContent">

          <div className="tab-pane fade shadow rounded bg-white show active p-5 mb-5" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <h2 className="font-italic mb-4">Details</h2>
            <ProfileDetails />
          </div>

          <div className="tab-pane App mt-3 mb-5 p-3" id="v-pills-pending" role="tabpanel" aria-labelledby="v-pills-pending-tab">
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
              orders.filter(order => order.status.toLowerCase() === 'pending').slice(offset, offset + perPage).map(order => {
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

          <div className="tab-pane App mt-3 mb-5 p-3" id="v-pills-shipped" role="tabpanel" aria-labelledby="v-pills-shipped-tab">
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
              orders.filter(order => order.status.toLowerCase() === 'shipped').slice(offset, offset + perPage).map(order => {
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
          <div className="tab-pane App mt-3 mb-5 p-3" id="v-pills-completed" role="tabpanel" aria-labelledby="v-pills-completed-tab">
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
              orders.filter(order => order.status.toLowerCase() === 'completed').slice(offset, offset + perPage).map(order => {
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
        </div>
      </div>
    </div>
  )

}

export default Profile