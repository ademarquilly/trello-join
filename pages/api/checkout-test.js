const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

export default async function handler(req, res) {
  if (req.method === 'POST') {
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
            price: 'price_1Qot1WA7EOX8e0ZRbJEpw2Y6', // Replace with your price ID
            quantity: 1,
          },
        ],
        mode: 'subscription',
        subscription_data: {
          trial_period_days: 1, // Set trial period to 1 day
        },
        customer_email: email, // Pre-fill email
        return_url: `${req.headers.origin}/stripe-form?goal=success`,
      });
      console.log("Checkout session created:", session);
      res.send({ clientSecret: session.client_secret });
    } catch (err) {
      console.error("Error creating checkout session:", err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}