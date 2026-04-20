#!/usr/bin/env node
/**
 * Google OAuth Auth Helper
 * Startet lokalen HTTP-Server, öffnet Auth-URL, fängt Code ab, speichert Token
 */
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const TOKEN_PATH = path.join(__dirname, 'google_token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'google_credentials.json');
const PORT = 4242;
const REDIRECT_URI = `http://localhost:${PORT}`;

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
];

(async () => {
  const raw = await fs.readFile(CREDENTIALS_PATH, 'utf8');
  const keys = JSON.parse(raw);
  const key = keys.installed || keys.web;

  const oauth2Client = new OAuth2Client(key.client_id, key.client_secret, REDIRECT_URI);

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
  });

  console.log('\n=== GOOGLE AUTH ===');
  console.log('Öffne diesen Link im Browser:\n');
  console.log(authUrl);
  console.log('\nWarte auf Callback (Port', PORT, ')...\n');

  // Lokaler Server fängt den Redirect ab
  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, REDIRECT_URI);
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');
      if (error) {
        res.end(`<h2>Fehler: ${error}</h2>`);
        server.close();
        reject(new Error(error));
        return;
      }
      if (code) {
        res.end('<h2>✅ Authentifizierung erfolgreich! Du kannst dieses Fenster schließen.</h2>');
        server.close();
        resolve(code);
      }
    });
    server.listen(PORT, '127.0.0.1');
    server.on('error', reject);
  });

  console.log('Code empfangen, tausche gegen Token...');
  const { tokens } = await oauth2Client.getToken(code);
  await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log('✅ Token gespeichert:', TOKEN_PATH);
  console.log('Token-Info:', {
    scope: tokens.scope,
    expiry_date: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : 'n/a',
    has_refresh_token: !!tokens.refresh_token,
  });
})().catch(err => {
  console.error('❌ Fehler:', err.message);
  process.exit(1);
});
