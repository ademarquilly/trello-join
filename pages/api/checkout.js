const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { email } = req.body;
        if (!email) {
          throw new Error("Invalid email address");
        }

        console.log("Creating checkout session with email:", email);

        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: [
            {
              price: 'price_1Qo7wjA7EOX8e0ZRzN71ybHv', // Replace with your price ID
              quantity: 1,
            },
          ],
          mode: 'subscription',
          subscription_data: {
            trial_period_days: 1, // Set trial period to 1 day
          },
          customer_email: email, // Pre-fill email
          return_url: `${req.headers.origin}/activation-error?session_id={CHECKOUT_SESSION_ID}`,
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