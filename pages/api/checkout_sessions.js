const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        console.log("Creating checkout session...");
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: [
            {
              price: 'price_1Qo7wjA7EOX8e0ZRzN71ybHv',
              quantity: 1,
            },
          ],
          mode: 'subscription',
          return_url: `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
        });
        console.log("Checkout session created:", session);
        res.send({ clientSecret: session.client_secret });
      } catch (err) {
        console.error("Error creating checkout session:", err);
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    case "GET":
      try {
        console.log("Retrieving checkout session...");
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        console.log("Checkout session retrieved:", session);
        res.send({
          status: session.status,
          customer_email: session.customer_details.email
        });
      } catch (err) {
        console.error("Error retrieving checkout session:", err);
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    default:
      res.setHeader('Allow', req.method);
      res.status(405).end('Method Not Allowed');
  }
}