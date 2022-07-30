const stripe = require('stripe')(process.env.STRIPE_KEY)

class PaymentService {
  async findSession() {
    return await stripe.checkout.sessions.create({
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

  }




}

module.exports = new PaymentService()
