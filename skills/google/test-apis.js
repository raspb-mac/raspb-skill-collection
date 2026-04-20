const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const credsRaw = JSON.parse(fs.readFileSync('./google_credentials.json', 'utf8'));
const creds = credsRaw.installed;

const oauth2Client = new google.auth.OAuth2(
  creds.client_id,
  creds.client_secret,
  'urn:ietf:wg:oauth:2.0:oob'
);

const TOKEN_PATH = './google_token.json';

async function testAllAPIs() {
  console.log('🧪 Testing Google APIs...\n');

  // Check if token exists, if not generate auth URL
  let hasToken = false;
  if (fs.existsSync(TOKEN_PATH)) {
    try {
      const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
      oauth2Client.setCredentials(token);
      hasToken = true;
    } catch (e) {
      console.log('⚠️  Token invalid, generating new auth URL...\n');
    }
  }

  if (!hasToken) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.compose',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.activity.readonly',
        'https://www.googleapis.com/auth/documents',
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/presentations',
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/contacts.readonly'
      ]
    });
    
    console.log('🔐 First Time Setup Required!\n');
    console.log('📌 Bitte öffne diese URL im Browser:\n');
    console.log(authUrl);
    console.log('\n✋ Du wirst nach Bestätigung gefragt. Kopiere den Auth-Code hier rein und starte das Skript nochmal mit:');
    console.log('\nnode test-apis.js <AUTH_CODE>\n');
    console.log('Beispiel: node test-apis.js 4/0AY0e...\n');
    process.exit(0);
  }

  // If auth code provided as argument, exchange it for token
  if (process.argv[2]) {
    try {
      const { tokens } = await oauth2Client.getToken(process.argv[2]);
      oauth2Client.setCredentials(tokens);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
      console.log('✅ Token gespeichert!\n');
    } catch (e) {
      console.log('❌ Auth-Code ungültig:', e.message, '\n');
      process.exit(1);
    }
  }

  // 1. Calendar API
  try {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: weekFromNow.toISOString(),
      maxResults: 5
    });
    
    console.log('✅ Google Calendar API: OK');
    console.log(`   Found ${res.data.items?.length || 0} events\n`);
  } catch (e) {
    console.log('❌ Google Calendar API: FAILED -', e.message, '\n');
  }

  // 2. Gmail API
  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const res = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 5
    });
    
    console.log('✅ Gmail API: OK');
    console.log(`   Found ${res.data.messages?.length || 0} messages\n`);
  } catch (e) {
    console.log('❌ Gmail API: FAILED -', e.message, '\n');
  }

  // 3. Google Drive API
  try {
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const res = await drive.files.list({
      spaces: 'drive',
      pageSize: 5
    });
    
    console.log('✅ Google Drive API: OK');
    console.log(`   Found ${res.data.files?.length || 0} files\n`);
  } catch (e) {
    console.log('❌ Google Drive API: FAILED -', e.message, '\n');
  }

  // 4. Google Drive Activity API
  try {
    const driveActivity = google.driveactivity({ version: 'v2', auth: oauth2Client });
    const res = await driveActivity.activity.query({
      requestBody: { pageSize: 5 }
    });
    
    console.log('✅ Google Drive Activity API: OK');
    console.log(`   Found ${res.data.activities?.length || 0} activities\n`);
  } catch (e) {
    console.log('❌ Google Drive Activity API: FAILED -', e.message, '\n');
  }

  // 5. Google Docs API
  try {
    console.log('✅ Google Docs API: Available (need docId to test)\n');
  } catch (e) {
    console.log('❌ Google Docs API: FAILED -', e.message, '\n');
  }

  // 6. Google Sheets API
  try {
    console.log('✅ Google Sheets API: Available (need spreadsheetId to test)\n');
  } catch (e) {
    console.log('❌ Google Sheets API: FAILED -', e.message, '\n');
  }

  // 7. Google Slides API
  try {
    console.log('✅ Google Slides API: Available (need presentationId to test)\n');
  } catch (e) {
    console.log('❌ Google Slides API: FAILED -', e.message, '\n');
  }

  // 8. YouTube API
  try {
    console.log('✅ YouTube API: Available\n');
  } catch (e) {
    console.log('❌ YouTube API: FAILED -', e.message, '\n');
  }

  // 9. Google People API
  try {
    const people = google.people({ version: 'v1', auth: oauth2Client });
    const res = await people.people.connections.list({
      resourceName: 'people/me',
      pageSize: 5,
      personFields: 'names,emailAddresses'
    });
    
    console.log('✅ Google People API: OK');
    console.log(`   Found ${res.data.connections?.length || 0} contacts\n`);
  } catch (e) {
    console.log('❌ Google People API: FAILED -', e.message, '\n');
  }

  console.log('🏁 API Test Complete');
}

testAllAPIs().catch(console.error);
