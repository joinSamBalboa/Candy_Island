import React from 'react'
import Conversation from '../conversations/Conversation'


import OrderConfirmation from './OrderConfirmation'
import OrderStatus from './OrderStatus'


const Order = () => {



  return (
    <div className="row">
      <div className="col-md-3">
        {/* <!-- Tabs nav --> */}
        <div className="nav flex-column nav-pills nav-pills-custom" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a className="btn btn-lg btn-primary btn-block shadow mb-3" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
            <span className="font-weight-bold small text-uppercase">Order Confirmation</span></a>

          <a className="btn btn-lg btn-primary btn-block shadow mb-3" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
            <span className="font-weight-bold small text-uppercase">Order Status</span></a>

          <a className="btn btn-lg btn-primary btn-block shadow mb-3" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
            <span className="font-weight-bold small text-uppercase">Conversation</span></a>

        </div>
      </div>

      <div className="col-md-9">
        {/* <!-- Tabs content --> */}
        <div className="tab-content" id="v-pills-tabContent">
          <div className="tab-pane active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <OrderConfirmation />
          </div>

          <div className="tab-pane fade shadow rounded bg-white show p-5 mb-5" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <OrderStatus />
          </div>

          <div className="tab-pane fade shadow rounded bg-white p-5" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
            <Conversation />
          </div>
        </div>
      </div>
    </div>
  )

}

export default Order