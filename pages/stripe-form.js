"use client";

import { useCallback, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

console.log("KEY : ", process.env.NEXT_PUBLIC_TEST);

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_TEST);

export default function Page() {
  const [clientSecret, setClientSecret] = useState(null);

  const fetchClientSecret = useCallback(() => {
    // Retrieve first name and last name from session storage
    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');
    const email = `${firstName}.${lastName}@tenvil.com`;
    console.log('Email:', email);

    // Create a Checkout Session 
    return fetch("/api/checkout-test", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email, // Use the user from the URL
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
  }, []);

  useEffect(() => {
    fetchClientSecret();
  }, [fetchClientSecret]);

  const options = { clientSecret };

  return (
    <div className="stripe-form-test">
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