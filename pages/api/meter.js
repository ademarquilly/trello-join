const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, priceId } = req.body;

    try {
      // Create a new customer
      const customer = await stripe.customers.create({
        email: email,
      });

      // Create a subscription with the metered price ID
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        expand: ['latest_invoice.payment_intent'],
      });

      res.status(200).json({ clientSecret: subscription.latest_invoice.payment_intent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}