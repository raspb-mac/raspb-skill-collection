const { google } = require('googleapis');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync('./google_token.json', 'utf8'));
const credsRaw = JSON.parse(fs.readFileSync('./google_credentials.json', 'utf8'));
const creds = credsRaw.web;

const oauth2Client = new google.auth.OAuth2(
  creds.client_id,
  creds.client_secret,
  creds.redirect_uris[0]
);
oauth2Client.setCredentials(token);

async function testAllAPIs() {
  console.log('🧪 Testing ALL Google APIs with Real Requests...\n');

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
      pageSize: 5,
      fields: 'files(id, name, mimeType)'
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

  // 5. Google Sheets API (mit echtem Request)
  try {
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
    // List spreadsheets from Drive first
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const driveRes = await drive.files.list({
      spaces: 'drive',
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      pageSize: 1,
      fields: 'files(id, name)'
    });
    
    if (driveRes.data.files?.length > 0) {
      const spreadsheetId = driveRes.data.files[0].id;
      const sheetsRes = await sheets.spreadsheets.get({
        spreadsheetId: spreadsheetId
      });
      console.log('✅ Google Sheets API: OK');
      console.log(`   Found spreadsheet: "${sheetsRes.data.properties.title}"\n`);
    } else {
      console.log('✅ Google Sheets API: OK (no spreadsheets found)\n');
    }
  } catch (e) {
    console.log('❌ Google Sheets API: FAILED -', e.message, '\n');
  }

  // 6. Google Docs API (mit echtem Request)
  try {
    const docs = google.docs({ version: 'v1', auth: oauth2Client });
    // List documents from Drive first
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const driveRes = await drive.files.list({
      spaces: 'drive',
      q: "mimeType='application/vnd.google-apps.document'",
      pageSize: 1,
      fields: 'files(id, name)'
    });
    
    if (driveRes.data.files?.length > 0) {
      const documentId = driveRes.data.files[0].id;
      const docsRes = await docs.documents.get({
        documentId: documentId
      });
      console.log('✅ Google Docs API: OK');
      console.log(`   Found document: "${docsRes.data.title}"\n`);
    } else {
      console.log('✅ Google Docs API: OK (no documents found)\n');
    }
  } catch (e) {
    console.log('❌ Google Docs API: FAILED -', e.message, '\n');
  }

  // 7. Google Slides API (mit echtem Request)
  try {
    const slides = google.slides({ version: 'v1', auth: oauth2Client });
    // List presentations from Drive first
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const driveRes = await drive.files.list({
      spaces: 'drive',
      q: "mimeType='application/vnd.google-apps.presentation'",
      pageSize: 1,
      fields: 'files(id, name)'
    });
    
    if (driveRes.data.files?.length > 0) {
      const presentationId = driveRes.data.files[0].id;
      const slidesRes = await slides.presentations.get({
        presentationId: presentationId
      });
      console.log('✅ Google Slides API: OK');
      console.log(`   Found presentation: "${slidesRes.data.name}"\n`);
    } else {
      console.log('✅ Google Slides API: OK (no presentations found)\n');
    }
  } catch (e) {
    console.log('❌ Google Slides API: FAILED -', e.message, '\n');
  }

  // 8. YouTube API
  try {
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    const res = await youtube.channels.list({
      auth: oauth2Client,
      part: 'snippet',
      mine: true
    });
    
    if (res.data.items?.length > 0) {
      console.log('✅ YouTube API: OK');
      console.log(`   Channel: "${res.data.items[0].snippet.title}"\n`);
    } else {
      console.log('✅ YouTube API: OK (no YouTube channel)\n');
    }
  } catch (e) {
    console.log('❌ YouTube API: FAILED -', e.message, '\n');
  }

  // 9. Google People API
  try {
    const people = google.people({ version: 'v1', auth: oauth2Client });
    const res = await people.people.connections.list({
      resourceName: 'people/me',
      pageSize: 5,
      personFields: 'names,emailAddresses,organizations'
    });
    
    console.log('✅ Google People API: OK');
    console.log(`   Found ${res.data.connections?.length || 0} contacts\n`);
  } catch (e) {
    console.log('❌ Google People API: FAILED -', e.message, '\n');
  }

  console.log('🏁 All API Tests Complete!');
}

testAllAPIs().catch(console.error);
