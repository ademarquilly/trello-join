"use client";

import { useCallback, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

console.log("KEY : ", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Page() {
  const [user, setUser] = useState('');
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userParam = urlParams.get('user');
    if (userParam) {
      setUser(userParam);
      console.log("user extracted from URL:", userParam);
    } else {
      console.error("user parameter is missing in the URL");
    }
  }, []);

  const fetchClientSecret = useCallback(() => {
    if (!user) {
      console.error("user is not set");
      return Promise.reject("user is not set");
    }

    console.log("Creating checkout session with user:", user);

    // Create a Checkout Session 
    return fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user + "@tenvil.com", // Use the user from the URL
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data.clientSecret) {
          throw new Error("Client secret not found in response");
        }
        console.log("Client secret received:", data.clientSecret);
        setClientSecret(data.clientSecret);
        return data.clientSecret;
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        throw error;
      });
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchClientSecret();
    }
  }, [user, fetchClientSecret]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}