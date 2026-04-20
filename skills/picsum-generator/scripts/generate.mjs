import JSZip from 'jszip';
import { writeFile, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const COUNT = parseInt(process.argv[2]) || 10;
const WIDTH = parseInt(process.argv[3]) || 1280;
const HEIGHT = parseInt(process.argv[4]) || 720;
const OUTPUT_FILENAME = process.argv[5] || `picsum_${WIDTH}x${HEIGHT}_${COUNT}.zip`;
const WORKSPACE_DIR = process.env.WORKSPACE_DIR || '/home/node/.openclaw/workspace';
const TEMP_DIR = join(WORKSPACE_DIR, `temp_picsum_${Date.now()}`);

async function downloadImage(i) {
    const url = `https://picsum.photos/${WIDTH}/${HEIGHT}?random=${i}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Fehler: ${res.status}`);
    }
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

async function main() {
    try {
        if (!existsSync(TEMP_DIR)) {
            await mkdir(TEMP_DIR, { recursive: true });
        }

        const zip = new JSZip();

        for (let i = 1; i <= COUNT; i++) {
            console.log(`Lade Bild ${i}/${COUNT} (${WIDTH}x${HEIGHT})...`);
            try {
                const data = await downloadImage(i);
                const filename = `picsum_${i}.jpg`;
                zip.file(filename, data);
                await writeFile(join(TEMP_DIR, filename), data);
            } catch (err) {
                console.error(`Fehler bei Bild ${i}: ${err.message}`);
            }
        }

        console.log(`Erstelle ZIP-Archiv: ${OUTPUT_FILENAME}...`);
        const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
        const zipPath = join(WORKSPACE_DIR, OUTPUT_FILENAME);
        await writeFile(zipPath, zipContent);

        console.log(`ZIP erstellt unter: ${zipPath}`);
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
