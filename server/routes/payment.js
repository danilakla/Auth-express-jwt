const router = require('express').Router();
const stripe = require('stripe')('sk_test_51LQurPJHzd3nc1w3CWDSjaiCwAFOfCnMMUPr31VrIF3Rj4qMfasufWCQB9FS03Gbk0nY0QrqHAI0XOXckicwQeWG00Ecfh9urp')
const midl = require('../middleware/auth-middleware')

router.post('/create-checkout-session', midl, async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Phone',
          },
          unit_amount: 200000,
        },
        quantity: 1,
      },
    ],

    mode: 'payment',
    success_url: `${process.env.HOST_CLIENT}successPayment`,
    cancel_url: `${process.env.HOST_CLIENT}userInterface`,
  });
  console.log(session);
  res.send({ url: session });
});
module.exports = router