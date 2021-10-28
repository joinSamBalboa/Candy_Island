import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'

const FeedbackModal = ({ listing, id }) => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    text: '',
    rating: 1,
  })

  const [errors, setErrors] = useState({
    text: '',
  })


  const handleSubmitFeedback = async (event) => {
    event.preventDefault()
    try {
      await axios.post(
        'api/feedbacks/',
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push(`/search/${id}`)
      setFormData({})
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
    <div id="ModalFeedbackForm" className="modal fade">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">Give feedback on {listing.name}</h1>
          </div>
          <div className="modal-body">
            <form role="form" onSubmit={handleSubmitFeedback} action="">
              <input type="hidden" name="_token" value="" />
              <div className="form-group">
                <label className="control-label">Feedback:</label>
                <div>
                  <textarea onInput={handleChange} type="textarea" className="form-control" name="text" value={formData.text} />
                </div>
              </div>
              <div className="col-md-5 product-qty">
                <label className="control-label">Rating:</label>
                <input onInput={handleChange} type="number" name="rating" className="form-control" value={formData.rating} />
              </div>
              <div className="form-group">
                <div>
                </div>
              </div>
              <div className="form-group">
                <div>
                  <button type="submit" className="btn btn-lg btn-primary btn-block">Submit!</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}

export default FeedbackModal