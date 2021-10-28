import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'
import logo from '../../assets/ISLAND.svg'

const OrderConfirmation = () => {


  const history = useHistory()

  const { id } = useParams()

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
      } catch (error) {
        setHasError(true)
      }
    }
    getOrder()
  }, [id])

  const totalPrice = (order.listing.price * order.quantity).toFixed(2)

  const address = order.address
  const orderAddress = address
  console.log({ orderAddress })


  return (
    <div className="container rounded card mt-1 shadow">
      <div border="0" cellPadding="0" cellSpacing="0" width="100%">
        <div>
          <div align="center" bgcolor="#eeeeee">
            <div align="center" border="0" cellPadding="0" cellSpacing="0" width="100%" >
              <div>
                <div align="center" bgcolor="#ffffff">
                  <div align="center" border="0" cellPadding="0" cellSpacing="0" width="100%" >
                    <div>
                      <div align="center"> <img src={logo} width="125" height="120" /><br />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-danger text-center"> Payment to be made to {order.listing.owner.btc_address}</h3>
                    </div>
                    <div>
                      <div align="left">
                        <div cellSpacing="0" cellPadding="0" border="0" width="100%">
                          <div className="d-flex">
                            <p width="75%" align="left" bgcolor="#eeeeee"> Order # </p>
                            <p width="25%" align="left" bgcolor="#eeeeee"> {order.id} </p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p width="75%" align="left">{order.quantity}x {order.listing.name} </p>
                            <p width="25%" align="left"> £{order.listing.price} </p>
                          </div>

                        </div>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <div className="d-flex justify-content-between">
                        <p width="75%" align="left"> TOTAL </p>
                        <p width="25%" align="left"> £{totalPrice} </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <hr />
              <div className="d-flex flex-column align-items-start" >
                <p>Delivery Address</p>
                <address>{order.address}</address>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}

export default OrderConfirmation