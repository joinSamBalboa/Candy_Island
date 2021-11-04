import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'

const Search = () => {

  useLocation()

  const [listings, setListings] = useState([])
  const [filteredListings, setFilteredListings] = useState([])
  const [filters, setFilters] = useState({ searchTerm: '', categories: '', ships_to: '' })
  const [hasError, setHasError] = useState(false)

  const [currentPage, setCurrentPage] = useState(0)
  const perPage = 5
  const pageCount = Math.ceil(filteredListings.length / perPage)
  const offset = currentPage * perPage

  const categories = [
    { value: 'Sour', label: 'Sour' },
    { value: 'Sherbet', label: 'Sherbet' },
    { value: 'Mint', label: 'Mint' },
    { value: 'Lollipop', label: 'Lollipop' },
    { value: 'Liquorice', label: 'Liquorice' },
    { value: 'Jelly', label: 'Jelly' },
    { value: 'Marshmallow', label: 'Marshmallow' },
    { value: 'Fizzy', label: 'Fizzy' },
    { value: 'Chocolate', label: 'Chocolate' },
    { value: 'Chewy', label: 'Chewy' },
    { value: 'Bubble Gum', label: 'Bubble Gum' },
    { value: 'Boiled', label: 'Boiled' }
  ]

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          '/api/listings/',
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        console.log(data)
        setListings(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getData()
  }, [])


  const handleFilterChange = event => {
    const newObj = { ...filters, [event.target.name]: event.target.value }
    setFilters(newObj)
  }

  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i')
    setFilteredListings(listings.filter(listing => {
      return regexSearch.test(listing.name) && (listing.categories[0].name.includes(filters.categories) && listing.ships_to.includes(filters.ships_to) || filters.categories === 'All')
    }))
  }, [filters, listings])

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setCurrentPage(selectedPage)
  }

  const handleMultiSelected = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFilters({ ...filters, [name]: values })
  }


  return (
    <>



      <div className="ml-3 mr-3">
        <div className="row">
          <div className="col-lg-8">

            <div className="App">
              <ReactPaginate
                previousLabel={'← Previous'}
                nextLabel={'Next →'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
              />
              {listings.length > 0 ?
                (filters.categories !== '' || filters.searchTerm !== '' || filters.ships_to !== '' ? filteredListings : listings).sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1).slice(offset, offset + perPage).map(listing => {
                  return <div key={listing.id} className="card mb-4 listing-card shadow">
                    <Link to={`/search/${listing.id}`}><img className="card-img-top" src={listing.image} alt="..." /></Link>
                    <div className="card-body">
                      <h2 className="card-title h4 fw-bolder-color">{listing.name}</h2>
                      <p className="small">Sold by {listing.owner.username}</p>
                      <p className="card-text">{listing.description.substring(0, 200)}...</p>
                      <h3>£{listing.price}</h3>
                      <Link className="btn btn-primary" to={`/search/${listing.id}`}>View Listing</Link>
                    </div>
                  </div>
                })
                :
                <p>Can&apos;t find listing</p>
              }
            </div>


          </div>

          <div className="col-lg-4">
            <div className="card mb-4 shadow">
              <div className="card-header">Search</div>
              <div className="card-body">
                <div className="input-group">
                  <input className="form-control" type="text" placeholder="Search Listings" onChange={handleFilterChange} name="searchTerm" value={filters.searchTerm} />
                </div>
              </div>
            </div>

            <div className="card mb-4 shadow">
              <div className="card-header">Filter by:</div>
              <div className="card-body">
                <div className="mb-3">
                  <label>Category: </label>
                  <Select
                    options={categories}
                    isMulti
                    name="categories"
                    className='select'
                    onChange={(selected) => handleMultiSelected(selected, 'categories')}
                  />
                </div>
                <div className="mb-3">
                  <label>Ships to: </label>
                  <select onChange={handleFilterChange} name="ships_to" value={filters.ships_to} className="form-control">
                    <option value="Worldwide">Worldwide</option>
                    <option value="EU">EU</option>
                    <option value="US">US</option>
                    <option value="UK">UK</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="South America">South America</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Search