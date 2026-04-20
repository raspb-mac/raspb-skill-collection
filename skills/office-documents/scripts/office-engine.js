/**
 * office-engine.js
 * Core Node.js Engine for raspb Professional Documents
 * Dynamic Style Sync from raspb Design System
 */

import fs from 'fs';
import path from 'path';
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
} from 'docx';
import axios from 'axios';

// raspb Design System Fallback Tokens
const FALLBACK_TOKENS = {
    RASPB_PINK: "#E8458B",
    RASPB_PURPLE: "#7B2FBE",
    RASPB_VIOLET: "#A855F7",
    RASPB_ICONIC_BLUE: "#121D33",
    RASPB_DARK_GREY: "#444444",
    RASPB_LIGHT_GREY: "#999999",
    RASPB_FONT: "Plus Jakarta Sans",
};

/**
 * Sync with raspb Style Guide html (best-effort, falls back silently)
 */
async function syncStyleTokens(url = "https://claw.raspb.eu/showcase/raspb-style-guide.html") {
    try {
        const response = await axios.get(url, { timeout: 3000 });
        const html = response.data;
        const tokens = { ...FALLBACK_TOKENS };

        const pinkMatch = html.match(/--color-pink:\s*(#[0-9a-fA-F]{6})/);
        if (pinkMatch) tokens.RASPB_PINK = pinkMatch[1];

        const purpleMatch = html.match(/--color-purple:\s*(#[0-9a-fA-F]{6})/);
        if (purpleMatch) tokens.RASPB_PURPLE = purpleMatch[1];

        const fontMatch = html.match(/--font-main:\s*['"]?([^'";\s]+)['"]?/);
        if (fontMatch) tokens.RASPB_FONT = fontMatch[1].replace(/['"]/g, '').split(',')[0].trim();

        return tokens;
    } catch {
        return FALLBACK_TOKENS;
    }
}

/** Strip simple inline markdown (**bold**, *italic*) and return TextRun children */
function parseInlineMarkdown(text, baseFont, baseSize, baseColor) {
    const runs = [];
    // Match **bold**, *italic*, or plain text
    const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|([^*]+))/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        if (match[2]) {
            // Bold
            runs.push(new TextRun({ text: match[2], font: baseFont, size: baseSize, color: baseColor, bold: true }));
        } else if (match[3]) {
            // Italic
            runs.push(new TextRun({ text: match[3], font: baseFont, size: baseSize, color: baseColor, italics: true }));
        } else if (match[4]) {
            // Plain
            runs.push(new TextRun({ text: match[4], font: baseFont, size: baseSize, color: baseColor }));
        }
    }
    return runs.length > 0 ? runs : [new TextRun({ text, font: baseFont, size: baseSize, color: baseColor })];
}

/**
 * Build Professional Word Document from segments.
 *
 * Segment types: heading, paragraph, list, numbered-list, checklist, quote
 */
export async function createDocument({ output, title, segments, meta = {} }) {
    const tokens = await syncStyleTokens();
    const outputPath = path.resolve(output);

    // Ensure output directory
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const c = (hex) => hex.replace('#', '');
    const children = [];

    for (const seg of segments) {
        switch (seg.type) {
            case 'heading': {
                const level = Math.min(Math.max(seg.level || 1, 1), 3);
                const headingMap = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3 };
                const sizeMap = { 1: 36, 2: 30, 3: 26 }; // 18pt, 15pt, 13pt
                const colorMap = { 1: tokens.RASPB_PINK, 2: tokens.RASPB_PURPLE, 3: tokens.RASPB_ICONIC_BLUE };

                children.push(new Paragraph({
                    heading: headingMap[level],
                    spacing: { before: level === 1 ? 400 : 280, after: level === 1 ? 200 : 120 },
                    children: [
                        new TextRun({
                            text: seg.text,
                            color: c(colorMap[level]),
                            font: tokens.RASPB_FONT,
                            size: sizeMap[level],
                            bold: true,
                        }),
                    ],
                }));
                break;
            }

            case 'paragraph': {
                // Split by newlines to create separate paragraphs
                const lines = seg.text.split('\n');
                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed) continue;
                    children.push(new Paragraph({
                        spacing: { before: 80, after: 80, line: 300 },
                        children: parseInlineMarkdown(trimmed, tokens.RASPB_FONT, 22, c(tokens.RASPB_DARK_GREY)),
                    }));
                }
                break;
            }

            case 'list': {
                for (const item of (seg.items || [])) {
                    children.push(new Paragraph({
                        bullet: { level: 0 },
                        spacing: { before: 40, after: 40 },
                        children: parseInlineMarkdown(item, tokens.RASPB_FONT, 22, c(tokens.RASPB_DARK_GREY)),
                    }));
                }
                break;
            }

            case 'numbered-list': {
                for (const item of (seg.items || [])) {
                    // docx library doesn't have native numbered lists via bullet,
                    // so we prefix with the number manually
                    const idx = (seg.items || []).indexOf(item) + 1;
                    children.push(new Paragraph({
                        spacing: { before: 40, after: 40 },
                        indent: { left: 720 }, // ~0.5 inch
                        children: parseInlineMarkdown(`${idx}. ${item}`, tokens.RASPB_FONT, 22, c(tokens.RASPB_DARK_GREY)),
                    }));
                }
                break;
            }

            case 'checklist': {
                for (const item of (seg.items || [])) {
                    children.push(new Paragraph({
                        spacing: { before: 40, after: 40 },
                        indent: { left: 720 },
                        children: parseInlineMarkdown(item, tokens.RASPB_FONT, 22, c(tokens.RASPB_DARK_GREY)),
                    }));
                }
                break;
            }

            case 'quote': {
                children.push(new Paragraph({
                    spacing: { before: 100, after: 100 },
                    indent: { left: 720 },
                    children: [
                        new TextRun({
                            text: seg.text,
                            font: tokens.RASPB_FONT,
                            size: 22,
                            color: c(tokens.RASPB_LIGHT_GREY),
                            italics: true,
                        }),
                    ],
                }));
                break;
            }

            default:
                // Unknown segment type → render as paragraph
                if (seg.text) {
                    children.push(new Paragraph({
                        spacing: { before: 80, after: 80 },
                        children: [new TextRun({ text: seg.text, font: tokens.RASPB_FONT, size: 22, color: c(tokens.RASPB_DARK_GREY) })],
                    }));
                }
        }
    }

    // Assemble Document
    const doc = new Document({
        title: title || "raspb Document",
        creator: meta.creator || "raspb office-engine (Haley)",
        description: meta.description || "Professional Document by raspb webservices",
        sections: [{
            properties: {
                page: {
                    margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
                },
            },
            children,
        }],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);

    return outputPath;
}
