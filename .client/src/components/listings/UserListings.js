import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'


const UserListing = () => {


  const [listings, setListings] = useState({})
  const [hasError, setHasError] = useState(false)

  const [currentPage, setCurrentPage] = useState(0)
  const perPage = 5
  const pageCount = Math.ceil(listings.length / perPage)
  const offset = currentPage * perPage

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setCurrentPage(selectedPage)
  }



  useEffect(() => {
    const getProfile = async () => {

      try {
        const { data } = await axios.get(
          '/api/members/profile/',
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setListings(data.listings)
      } catch (error) {
        setHasError(true)
      }
    }
    getProfile()
  }, [])

  return (
    <>
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
      />
      {
        listings.length > 0 &&
        listings.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1).slice(offset, offset + perPage).map(listing => {
          return <div key={listing.id} className="card mb-4 listing-card shadow">
            <a href="#!"><img className="card-img-top" src={listing.image} alt={listing.image} /></a>
            <div className="card-body">
              <div className="small text-muted">{listing.created_at}</div>
              <h2 className="card-title h4">{listing.name}</h2>
              <p className="card-text">{listing.description.substring(0, 200)}...</p>
              <Link className="btn btn-primary" to={`/search/${listing.id}`}>View Listing</Link>
            </div>
          </div>
        })
      }
    </>
  )
}

export default UserListing