const { writeFile, mkdir, rm } = require('fs/promises');
const { join } = require('path');
const { existsSync } = require('fs');
const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

const COUNT = parseInt(process.argv[2]) || 10;
const WIDTH = parseInt(process.argv[3]) || 1280;
const HEIGHT = parseInt(process.argv[4]) || 720;
const OUTPUT_FILENAME = process.argv[5] || `picsum_${WIDTH}x${HEIGHT}_${COUNT}.zip`;
const WORKSPACE_DIR = process.env.WORKSPACE_DIR || '/home/node/.openclaw/workspace';
const TEMP_DIR = join(WORKSPACE_DIR, `temp_picsum_${Date.now()}`);

async function downloadImage(i, dest) {
    const url = `https://picsum.photos/${WIDTH}/${HEIGHT}?random=${i}`;
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const request = https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                https.get(response.headers.location, (res) => {
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        resolve();
                    });
                }).on('error', (err) => {
                    fs.unlink(dest, () => reject(err));
                });
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Fehler: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
            });
        });
        request.on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
        // cleanup file on finish to ensure handle is closed before zipping
        file.on('close', resolve);
    });
}

async function main() {
    try {
        if (!existsSync(TEMP_DIR)) {
            await mkdir(TEMP_DIR, { recursive: true });
        }

        const files = [];
        for (let i = 1; i <= COUNT; i++) {
            process.stdout.write(`Lade Bild ${i}/${COUNT} (${WIDTH}x${HEIGHT})...\r`);
            const filename = `picsum_${i}.jpg`;
            const dest = join(TEMP_DIR, filename);
            try {
                await downloadImage(i, dest);
                files.push(filename);
            } catch (err) {
                console.error(`\nFehler bei Bild ${i}: ${err.message}`);
            }
        }
        console.log(`\nDownload abgeschlossen. ${files.length} Bilder heruntergeladen.`);

        if (files.length === 0) {
            throw new Error("Keine Bilder heruntergeladen.");
        }

        console.log(`Erstelle ZIP-Archiv: ${OUTPUT_FILENAME}...`);
        const zipPath = join(WORKSPACE_DIR, OUTPUT_FILENAME);
        
        try {
            // -j (junk paths) speichert nur die Dateien ohne die Ordnerstruktur
            execSync(`zip -j "${zipPath}" "${TEMP_DIR}"/*`);
            console.log(`ZIP erstellt unter: ${zipPath}`);
        } catch (e) {
            console.error("Fehler beim Erstellen des ZIP-Archivs.");
            throw e;
        }
    } finally {
        if (existsSync(TEMP_DIR)) {
            console.log(`Lösche temporären Ordner: ${TEMP_DIR}`);
            await rm(TEMP_DIR, { recursive: true, force: true });
        }
    }
}

main().catch(err => {
    console.error('Kritischer Fehler:', err);
    process.exit(1);
});
