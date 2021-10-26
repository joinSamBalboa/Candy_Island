import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'

const OrderStatus = () => {


  const { id } = useParams()
  const [formData, setFormData] = useState({
    status: 'Pending',
  })
  const [order, setOrder] = useState({
    listing: {
      price: 0,
      owner: {
        btc_address: '',
      },
    },
    quantity: 0,
  })
  const [hasError, setHasError] = useState(false)



  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`,
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } })
        setOrder(data)
        console.log(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getOrder()
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(`/api/orders/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } })
    } catch (error) {
      setHasError(true)
    }
  }

  console.log(formData)

  const handleChange = event => {
    const target = event.target
    const value = target.value
    setFormData({ ...formData, [event.target.name]: value })
  }

  return (
    <>
      <h2 className="font-italic mb-4">Order Status: {order.status}</h2>

      <>
        <label>Order status:</label>
        <form>
          <select onInput={handleChange} className="form-select" value={formData.status} name="status">
            <option value="Pending">Pending</option>
            {order.listing.owner &&
              <option value="Shipped">Shipped</option>
            }
            {order.owner && order.status === 'Shipped' &&
              <option value="Completed">Completed</option>
            }
          </select>
          <button onSubmit={handleSubmit} type="submit" className="btn btn-primary btn-block mt-3">Confirm</button>
        </form>
      </>

    </>
  )

}

export default OrderStatus