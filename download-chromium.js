const puppeteer = require("puppeteer-core");
const { execSync } = require("child_process");

// Télécharge Chromium dans un dossier spécifique
const chromiumPath = puppeteer.executablePath();
console.log("Chromium téléchargé ici :", chromiumPath);
