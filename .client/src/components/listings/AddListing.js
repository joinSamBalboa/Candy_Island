import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import ImageUpload from '../helpers/ImageUpload'
import Select from 'react-select'

const AddListing = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    ships_to: '',
    quantity: 0,
    description: '',
    price: 0.00,
    weight: 0,
    categories: [],
  })

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    ships_to: '',
    quantity: '',
    description: '',
    price: '',
    weight: '',
    categories: '',
  })


  const categories = [
    { value: '12', label: 'Sour' },
    { value: '11', label: 'Sherbet' },
    { value: '10', label: 'Mint' },
    { value: '9', label: 'Lollipop' },
    { value: '8', label: 'Liquorice' },
    { value: '7', label: 'Jelly' },
    { value: '6', label: 'Marshmallow' },
    { value: '5', label: 'Fizzy' },
    { value: '4', label: 'Chocolate' },
    { value: '3', label: 'Chewy' },
    { value: '2', label: 'Bubble Gum' },
    { value: '1', label: 'Boiled' }
  ]

  const handleImageUrl = (url) => {
    try {
      setFormData({ ...formData, image: url })
    } catch (error) {
      console.log(error)
    }
  }

  const handleMultiSelected = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: values })
  }

  const handleChange = event => {
    const target = event.target
    const value = target.value
    setFormData({ ...formData, [event.target.name]: value })
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(
        '/api/listings/',
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push('/listings')
    } catch (error) {
      // if (error.response.data.errors) setErrors(error.response.data.errors)
      // console.log(error.response.data)
    }
  }
  console.log(formData)

  return (
    <form onSubmit={handleSubmit}>
      {/* <!-- Name --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form4Example1">Name</label>
        <input onInput={handleChange} name="name" value={formData.name} type="text" id="form4Example1" className="form-control" />
      </div>

      {/* <!-- Ships to --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form4Example1">Ships to:</label>
        <input onInput={handleChange} name="ships_to" value={formData.ships_to} type="text" id="form4Example1" className="form-control" />
      </div>

      {/* <!-- Quantity --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form4Example1">Quantity</label>
        <input onInput={handleChange} name="quantity" value={formData.quantity} type="number" id="form4Example1" className="form-control" />
      </div>

      {/* <!-- Price --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form4Example1">Price (£)</label>
        <input onInput={handleChange} name="price" value={formData.price}  type="number" id="form4Example1" className="form-control" />
      </div>

      {/* <!-- weight --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form4Example1">Weight (g)</label>
        <input onInput={handleChange} name="weight" value={formData.weight} type="number" id="form4Example1" className="form-control" />
      </div>

      {/* <!-- Description --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form4Example3">Description</label>
        <textarea onInput={handleChange} name="description" value={formData.description} className="form-control" id="form4Example3" rows="4" maxLength="500"></textarea>
      </div>

      <Select
        options={categories}
        isMulti
        name="categories"
        className='select'
        value={formData.categories}
        onChange={(selected) => handleMultiSelected(selected, 'categories')}
      />

      <div className="form-group mt-3"> 
        <ImageUpload value={formData.image} name="image" handleImageUrl={handleImageUrl} />
      </div>



      {/* <!-- Submit button --> */}
      <button type="submit" className="btn btn-primary btn-block mb-4">Add</button>
    </form>
  )

}

export default AddListing