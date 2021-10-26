import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'

const OrderModal = ({ listing, id }) => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    address: '',
    quantity: 1,
    status: 'Pending',
  })

  const [errors, setErrors] = useState({
    address: '',
  })

  const handleChange = event => {
    const target = event.target
    const value = target.value
    setFormData({ ...formData, [target.name]: value, listing: id })
    setErrors({ ...errors, [target.name]: '' })
  }

  const decrementQuantity = () => {
    const quantity = formData.quantity
    if (quantity > 0) setFormData({ ...formData, quantity: parseInt(quantity - 1) })
  }

  const incrementQuantity = (event) => {
    const quantity = formData.quantity
    setFormData({ ...formData, quantity: parseInt(quantity + 1) })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(
        '/api/orders/',
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      
    } catch (error) {
      // if (error.response.data.errors) setErrors(error.response.data.errors)
    }
    history.push('/orders')
  }

  const totalPrice = (listing.price * formData.quantity).toFixed(2)

  return (
    <div id="ModalOrderForm" className="modal fade">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">Order {
              formData.quantity > 0 &&
              `${formData.quantity}x`
            } {listing.name}</h1>
          </div>
          <div className="modal-body">
            <form role="form" onSubmit={handleSubmit} action="">
              <input type="hidden" name="_token" value="" />
              <div className="form-group">
                <label className="control-label">Address:</label>
                <div>
                  <input onInput={handleChange} type="TextArea" className="form-control input-lg address-field" name="address" value={formData.address} />
                </div>
              </div>
              <div className="col-md-5 product-qty">
                <span onClick={incrementQuantity} className="btn btn-lg btn-primary btn-block mt-3 mb-3" value="+">
                  +
                </span>
                <input onInput={handleChange} name="quantity" className="form-control" value={formData.quantity} />
                <span onClick={decrementQuantity} className="btn btn-lg btn-primary btn-block mt-3 mb-3" value="-">
                  -
                </span>
              </div>
              <span>Total price: £{totalPrice} </span>
              <div className="form-group">
                <div>
                </div>
              </div>
              <div className="form-group">
                <div>
                  <button type="submit" className="btn btn-lg btn-primary btn-block">Confirm</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}

export default OrderModal