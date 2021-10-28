import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'

const SearchCategory = () => {

  const { name } = useParams()

  useLocation()

  const [listings, setListings] = useState([])
  const [filteredListings, setFilteredListings] = useState([])
  const [hasError, setHasError] = useState(false)

  const [currentPage, setCurrentPage] = useState(0)
  const perPage = 5
  const pageCount = Math.ceil(filteredListings.length / perPage)
  const offset = currentPage * perPage

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `/api/categories/${name}`,
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        console.log(data.listings)
        setListings(data.listings)
      } catch (error) {
        setHasError(true)
      }
    }
    getData()
  }, [name])



  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setCurrentPage(selectedPage)
  }

  return (
    <>
      <div className="margin-10">
        <div className="text-center my-5">
          <h1 className="fw-bolder ">{name} Candy</h1>
        </div>
      </div>

      <div className="App margin-10">
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
        />
        {listings.length ?
          listings.map(listing => {
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
          <p className="text-white">No listings in this category yet</p>
        }
      </div>








    </>
  )

}

export default SearchCategory