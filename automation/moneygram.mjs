import puppeteer from 'puppeteer';

(async () => {

  // ----------------------------------------------

  const proxyUrl = 'http://fr.smartproxy.com:40001';
  const username = 'bstrokin123';
  const password = 'E~9jBoNk8pnW5w1ahu';

  // ----------------------------------------------

  const ownerAddress = '13 allée du Coteau';
  const ownerPostal = '56530';
  const ownerCity = 'Quéven';

  const ownerFullname = 'Daria MALARDE';

  let cardNumber = '4165 3885 3989 5260';
  let cardExpiry = '06/27';
  let cardCvv = '108';

  // ----------------------------------------------

  const ownerName = ownerFullname.split(' ')[0];
  const ownerSurname = ownerFullname.split(' ')[1]; 
  cardNumber = cardNumber.replace(/ /g, '');
  const cardMonth = parseInt(cardExpiry.split('/')[0], 10);
  const cardYear = parseInt(cardExpiry.split('/')[1], 10);

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

  // Navigate to the MoneyGram page
  await page.goto('https://www.moneygram.com/mgo/fr/fr/send/');

  // Add your automation steps here, similar to the simplex.mjs script
  // For example, filling out forms, entering card details, etc.

  // Close the browser
  await browser.close();
})();