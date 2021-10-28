import React from 'react'


import AddListing from '../listings/AddListing'
import UserListing from '../listings/UserListings'



const Vendor = () => {



  return (
    <div className="row">
      <div className="col-md-3">
        {/* <!-- Tabs nav --> */}
        <div className="nav flex-column nav-pills nav-pills-custom" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a className="btn btn-lg btn-primary btn-block shadow mb-3" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
            <span className="font-weight-bold small text-uppercase">Add Listing</span></a>

          <a className="btn btn-lg btn-primary btn-block shadow mb-3" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
            <span className="font-weight-bold small text-uppercase">Current Listings</span></a>

        </div>
      </div>

      <div className="col-md-9">
        {/* <!-- Tabs content --> */}
        <div className="tab-content" id="v-pills-tabContent">
          <div className="tab-pane fade shadow rounded bg-white show active p-5 mb-5" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <h2 className="font-italic mb-4">Add Listing</h2>
            <AddListing />
          </div>
          <div className="tab-pane App" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <UserListing />
          </div>
        </div>
      </div>
    </div>
  )

}

export default Vendor