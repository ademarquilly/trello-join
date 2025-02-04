const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, so we can handle raw body
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      const buf = await buffer(req);
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'customer.subscription.created') {
      const subscription = event.data.object;

      // Schedule a task to update the subscription after 1 hour
      setTimeout(async () => {
        try {
          await stripe.subscriptions.update(subscription.id, {
            trial_end: 'now',
          });
          console.log(`Subscription ${subscription.id} updated to end trial immediately.`);
        } catch (err) {
          console.error(`Failed to update subscription ${subscription.id}:`, err);
        }
      }, 30 * 1000); // 1 hour in milliseconds
    }

    res.status(200).send('Received webhook');
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}