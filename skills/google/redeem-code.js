const fs = require('fs');
const { OAuth2Client } = require('google-auth-library');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, 'google_credentials.json');
const TOKEN_PATH = path.join(__dirname, 'google_token.json');

async function redeemCode(code) {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const key = credentials.web;
  
  const oauth2Client = new OAuth2Client(
    key.client_id, 
    key.client_secret, 
    'https://claw.raspb.eu'
  );

  console.log('Tausche Code gegen Token...');
  const { tokens } = await oauth2Client.getToken(code);
  
  if (tokens.refresh_token) {
    console.log('✅ Refresh Token empfangen.');
  } else {
    console.log('⚠️ Kein Refresh Token empfangen. Zugriff könnte nach 1h ablaufen.');
  }

  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log('✅ Token erfolgreich in google_token.json gespeichert.');
}

const code = process.argv[2];
if (!code) {
  console.error('Bitte Code als Argument übergeben.');
  process.exit(1);
}

redeemCode(code).catch(console.error);
