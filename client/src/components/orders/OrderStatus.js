import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'

const OrderStatus = () => {


  const { id } = useParams()

  const [order, setOrder] = useState({
    status: '',
    listing: {
      price: 0,
      owner: {
        btc_address: '',
      },
    },
    quantity: 0,
  })
  const [hasError, setHasError] = useState(false)

  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}/`,
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } })
        setOrder(data)
        setUpdated(false)
      } catch (error) {
        setHasError(true)
      }
    }
    getOrder()
  }, [id, updated])

  const [formData, setFormData] = useState({
    status: order.status,
  })


  const handleSubmit = async (event) => {
    event.preventDefault()
    setUpdated(true)
    try {
      await axios.put(`/api/orders/${id}/`,
        { ...formData, address: order.address, listing: order.listing.id, owner: order.owner },
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } })
    } catch (error) {
      setHasError(true)
    }
  }

  const handleChange = event => {
    const target = event.target
    const value = target.value
    setFormData({ ...formData, [event.target.name]: value })
  }

  return (
    <>
      <h2 className="font-italic mb-4">Order Status: {order.status}</h2>


      {order.listing.owner &&
        <>
          <label>Order status:</label>
          <form onSubmit={handleSubmit}>
            <select onInput={handleChange} className="form-select" value={formData.status} name="status">
              <option value="Pending">Pending</option>

              <option value="Shipped">Shipped</option>

              <option value="Completed">Completed</option>

            </select>
            <button className="btn btn-primary btn-block mt-3">Confirm</button>
          </form>
        </>
      }


    </>
  )

}

export default OrderStatus