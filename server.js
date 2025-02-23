// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Qo70JA7EOX8e0ZRlatLci48fKDXPaFDJflL7mWFBYMHMB50BZSNxVy0mkTB3C21UWDWvKkwl6lV5WVsXZxLGQzh00P1HDNwp8');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1Qo83XA7EOX8e0ZRfvNfeSA2',
        quantity: 1,
      },
    ],
    mode: 'subscription',
    return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({clientSecret: session.client_secret});
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(4242, () => console.log('Running on port 4242'));