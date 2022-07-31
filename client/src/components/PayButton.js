import React, { useState } from 'react'

import $api from '../http/axios'
import "./css/buttonForPay.css"
function PayButton(bdGoods) {


  const [helpInfo, setInfo] = useState('')



  const handleCheckout = async () => {
    const res = await $api.post('/create-checkout-session', {
      cartItems: bdGoods.cartItems,
      userId: '62e3aca00be38eff3a124473'
    })
    if (res.data.error) {
      setInfo('You are not authorized');
    }
    if (res.data.url) {
      window.open(`${res.data.url.url}`);
    }
  }




  return (
    <div>

      <button onClick={() => handleCheckout()} id="login" class="button blue">
        <i class="fa fa-unlock"></i>
        <span>Payment you orders</span>
      </button>
      {helpInfo}
    </div >
  )
}


export default PayButton;
