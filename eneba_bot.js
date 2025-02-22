const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}


(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.eneba.com', { waitUntil: 'networkidle2' });

    console.log("Ouverture d'Eneba avec le navigateur par défaut...");

    // Attendre que l'élément soit chargé et cliquer dessus
    delay(3000);
    await page.click('input.s0H2qC');

    // Taper "chocolat" dans l'input
    delay(2000);
    await page.type('input.s0H2qC', 'chocolat');

    // Optionnel: Fermer le navigateur après un certain temps
    // await browser.close();
})();