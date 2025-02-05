const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
console.log("stripe : ", stripe);

async function cancelSubscription(subscriptionId) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    console.log(`Subscription ${subscription.id} is set to cancel at the end of the current period.`);
  } catch (err) {
    console.error(`Failed to cancel subscription ${subscriptionId}:`, err);
  }
}

// Replace 'sub_XXXXXXXXXXXXXXXX' with the actual subscription ID you want to cancel
const subscriptionId = 'sub_1QotYFA7EOX8e0ZRSxGtUeq9';
cancelSubscription(subscriptionId);