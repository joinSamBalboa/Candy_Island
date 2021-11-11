import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'

const Conversation = () => {

  const { id } = useParams()
  useLocation()

  const [messages, setMessages] = useState([])
  const [hasError, setHasError] = useState(false)


  const [formData, setFormData] = useState({
    message: '',
  })

  const [errors, setErrors] = useState({
    message: '',
  })
  
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}/`,
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } })
        setMessages(data.conversations)
        setSubmitted(false)
      } catch (error) {
        setHasError(true)
      }
    }
    getMessages()
  }, [id, submitted])


  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    try {
      await axios.post(
        '/api/conversations/',
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      setFormData({ message: '' })
    } catch (error) {
      // if (error.response.data.errors) setErrors(error.response.data.errors)
    }
    
  }

  const handleChange = (event) => {
    const target = event.target
    const value = target.value
    setFormData({ ...formData, [target.name]: value, order: id })
    setErrors({ ...errors, [target.name]: '' })
  }

  

  return (
    <>
      {

        messages.map(mes => {
          return <li key={mes.id} className="list-unstyled">
            <div className="row comments mb-2">
              <div className="col-md-9 col-sm-9 col-9 border mb-2">
                <h4 className="m-0"><a href="#">{mes.owner.username}</a></h4>
                <time className=" ml-3">{mes.sent_at}</time>
                <p className="mb-0 ">{mes.message}</p>
              </div>
            </div>
          </li>
        })
      }
      <form onSubmit={handleSubmit}>
        <div className="row comment-box-main p-3 rounded-bottom">
          <div className="col-md-9 col-sm-9 col-9 pr-0 comment-box">
            <input onInput={handleChange} type="text" className="form-control" placeholder="message" name="message" value={formData.message} />
          </div>
          <div className="col-md-3 col-sm-2 col-2 pl-0 text-center send-btn">
            <button className="btn btn-lg btn-primary btn-block mt-3">Send</button>
          </div>
        </div>
      </form>


    </>
  )
}

export default Conversation