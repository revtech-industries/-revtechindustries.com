/**
 * Export pitch deck to PDF using Puppeteer.
 * Run: node export-pdf.js
 * Requires: npm install puppeteer
 */
const path = require('path');
const fs = require('fs');

const scriptDir = __dirname;
const htmlPath = path.join(scriptDir, 'index.html');
const pdfPath = path.join(scriptDir, 'Artemis-Gaia-Pitch-Deck.pdf');

async function main() {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch (e) {
    console.error('Puppeteer not found. Run: npm install puppeteer');
    process.exit(1);
  }

  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/').replace(/^\/?/, '');
  console.log('Loading:', fileUrl);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 15000 });
  await page.emulateMediaType('print');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '8mm', right: '10mm', bottom: '8mm', left: '10mm' },
  });

  await browser.close();
  console.log('Saved:', pdfPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
