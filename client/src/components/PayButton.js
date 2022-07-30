import React, { useState } from 'react'

import $api from '../http/axios'
import "./css/buttonForPay.css"
function PayButton(bdGoods) {
  const handleCheckout = async () => {
    try {
      const res = await $api.post('/create-checkout-session', {
        cartItems: bdGoods.cartItems,
        userId: '62e3aca00be38eff3a124473'
      })
      console.log(res.data.url.url);
      if (res.data.url) {
        window.open(`${res.data.url.url}`);
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div>
      <button onClick={() => handleCheckout()} id="login" class="button blue">
        <i class="fa fa-unlock"></i>
        <span>Payment you orders</span>
      </button>

    </div >
  )
}


export default PayButton;
