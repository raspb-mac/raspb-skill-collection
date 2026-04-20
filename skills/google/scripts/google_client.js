const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/drive.metadata.readonly'
];

const TOKEN_PATH = path.join(__dirname, '../google_token.json');
const CREDENTIALS_PATH = path.join(__dirname, '../google_credentials.json');

async function authorize() {
    let content;
    try {
        content = await fs.readFile(CREDENTIALS_PATH);
    } catch (e) {
        // Fallback for setup or first run
        console.error('Credentials file missing at:', CREDENTIALS_PATH);
        throw e;
    }
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    
    // Determine redirect URI based on client type
    let redirectUri = 'urn:ietf:wg:oauth:2.0:oob';
    if (keys.web) {
        // Web application: use the first redirect URI from credentials
        redirectUri = key.redirect_uris?.[0] || 'https://claw.raspb.eu';
    }
    
    const oauth2Client = new OAuth2Client(
        key.client_id,
        key.client_secret,
        redirectUri
    );

    try {
        const token = await fs.readFile(TOKEN_PATH);
        oauth2Client.setCredentials(JSON.parse(token));
        return oauth2Client;
    } catch (e) {
        if (process.argv[3] === 'token' && process.argv[4]) {
            const {tokens} = await oauth2Client.getToken(process.argv[4]);
            await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
            console.log('Token stored to', TOKEN_PATH);
            oauth2Client.setCredentials(tokens);
            return oauth2Client;
        }
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        return { needs_auth: true, url: authUrl, client: oauth2Client };
    }
}

async function addCalendarEvent(auth, {summary, description, start, end}) {
    const calendar = google.calendar({version: 'v3', auth});
    const event = {
        summary: summary,
        description: description,
        start: {
            dateTime: start,
            timeZone: 'Europe/Berlin',
        },
        end: {
            dateTime: end,
            timeZone: 'Europe/Berlin',
        },
        reminders: {
            useDefault: false,
            overrides: [
                {method: 'popup', minutes: 10},
            ],
        },
    };

    const res = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
    });
    return res.data;
}

async function sendMail(auth, {to, subject, text, html}) {
    const gmail = google.gmail({version: 'v1', auth});
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const boundary = "__boundary_string__";
    
    let messageParts = [
        `From: "raspb Webservices" <raspb.webservices@gmail.com>`,
        `To: ${to}`,
        `Subject: ${utf8Subject}`,
        'MIME-Version: 1.0',
        `Content-Type: multipart/alternative; boundary="${boundary}"`,
        '',
        `--${boundary}`,
        'Content-Type: text/plain; charset=utf-8',
        'Content-Transfer-Encoding: 7bit',
        '',
        text || 'HTML content only',
        '',
        `--${boundary}`,
        'Content-Type: text/html; charset=utf-8',
        'Content-Transfer-Encoding: base64',
        '',
        Buffer.from(html || text).toString('base64'),
        '',
        `--${boundary}--`
    ];
    
    const message = messageParts.join('\n');
    const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedMessage,
        },
    });
    return res.data;
}

const action = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];
const arg3 = process.argv[5];
const arg4 = process.argv[6];

authorize().then(async (auth) => {
    if (auth.needs_auth) {
        // No change here
    } else {
        if (action === 'calendar_add') {
            // calendar_add <summary> <description> <startISO> <endISO>
            const result = await addCalendarEvent(auth, {
                summary: arg1,
                description: arg2,
                start: arg3,
                end: arg4
            });
            console.log(JSON.stringify(result, null, 2));
        } else if (action === 'calendar_list') {
            const calendar = google.calendar({version: 'v3', auth});
            const res = await calendar.events.list({
                calendarId: 'primary',
                timeMin: arg1 || new Date().toISOString(),
                timeMax: arg2 || undefined,
                maxResults: parseInt(arg3) || 100,
                singleEvents: true,
                orderBy: 'startTime',
            });
            console.log(JSON.stringify(res.data.items, null, 2));
        } else if (action === 'calendar_update') {
            // calendar_update <eventId> <summary> [description]
            const calendar = google.calendar({version: 'v3', auth});
            const eventId = arg1;
            const summary = arg2;
            const description = arg3 || '';
            
            // First get the event to preserve all fields
            const getRes = await calendar.events.get({
                calendarId: 'primary',
                eventId: eventId,
            });
            
            const event = getRes.data;
            event.summary = summary;
            if (description) event.description = description;
            
            const res = await calendar.events.update({
                calendarId: 'primary',
                eventId: eventId,
                requestBody: event,
            });
            console.log(JSON.stringify(res.data, null, 2));
        } else if (action === 'calendar_delete') {
            const calendar = google.calendar({version: 'v3', auth});
            const res = await calendar.events.delete({
                calendarId: 'primary',
                eventId: arg1,
            });
            console.log(JSON.stringify({deleted: arg1}, null, 2));
        } else if (action === 'gmail_send') {
            // gmail_send <to> <subject> <text> <html>
            let htmlPayload = arg4;
            if (htmlPayload && htmlPayload.startsWith('file://')) {
                const filePath = htmlPayload.replace('file://', '');
                htmlPayload = await fs.readFile(filePath, 'utf8');
            }
            const result = await sendMail(auth, {
                to: arg1,
                subject: arg2,
                text: arg3,
                html: htmlPayload
            });
            console.log(JSON.stringify(result, null, 2));
        } else if (action === 'gmail_list') {
            const gmail = google.gmail({version: 'v1', auth});
            const res = await gmail.users.messages.list({
                userId: 'me',
                maxResults: parseInt(arg2) || 5,
                q: arg1 || 'is:unread'
            });
            console.log(JSON.stringify(res.data.messages || [], null, 2));
        } else if (action === 'gmail_get') {
            const gmail = google.gmail({version: 'v1', auth});
            const res = await gmail.users.messages.get({
                userId: 'me',
                id: arg1
            });
            console.log(JSON.stringify(res.data, null, 2));
        } else if (action === 'drive_list') {
            const drive = google.drive({version: 'v3', auth});
            const res = await drive.files.list({
                pageSize: parseInt(arg1) || 10,
                fields: 'files(id, name, mimeType, modifiedTime)',
            });
            console.log(JSON.stringify(res.data.files, null, 2));
        }
    }
}).catch(err => {
    console.error('ERROR:', err);
    process.exit(1);
});
