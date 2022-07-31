import React from 'react'

import $api from '../http/axios'
import "./css/buttonForPay.css"
function PayButton(bdGoods) {





  const handleCheckout = async () => {
    const res = await $api.post('/create-checkout-session', {
      cartItems: bdGoods.cartItems,
      userId: '62e3aca00be38eff3a124473'
    })

    if (res.data.url) {
      window.open(`${res.data.url.url}`);
    }
  }




  return (
    <div>

      <button onClick={() => handleCheckout()} id="login" className="button blue">
        <i className="fa fa-unlock"></i>
        <span>Payment you orders</span>
      </button>

    </div >
  )
}


export default PayButton;
