import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'
import ImageUpload from '../helpers/ImageUpload'

const VendorModal = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    btc_address: '',
    is_vendor: '',
    vendor_image: '',
  })

  const [errors, setErrors] = useState({
    btc_address: '',
    is_vendor: '',
    vendor_image: '',
  })

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(
        '/api/members/profile/',
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push('/vendor')
    } catch (error) {
      console.log('error ->', error.response)
      // if (error.response.data.errors) setErrors(error.response.data.errors)
    }
  }

  const handleImageUrl = (url) => {
    try {
      setFormData({ ...formData, profileImage: url })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div id="ModalVendorForm" className="modal fade">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">Become a vendor</h1>
          </div>
          <div className="modal-body">
            <form role="form" action="">
              <input type="hidden" name="_token" value="" />
              <div className="form-group">
                <label className="control-label">Bitcoin address:</label>
                <div>
                  <input type="text" className="form-control input-lg" name="btc_address" />
                </div>
              </div>
              <div className="form-check">
                <div className="formfield checkbox-field">
                  <label>Accept T&#38;Cs</label>
                  <input className="form-check-input" onInput={handleChange} id="flexCheckDefault" name="is_vendor" type="checkbox" value={formData.is_vendor} />
                </div>
              </div>
              <div className="form-group">

                <ImageUpload name="vendor_image" handleImageUrl={handleImageUrl} />

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

export default VendorModal