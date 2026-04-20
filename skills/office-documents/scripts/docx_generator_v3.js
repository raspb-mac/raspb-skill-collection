/**
 * docx_generator_v3.js
 * Main Entry Point for raspb Office Skill
 * Parses Markdown content into structured document segments.
 */

import { createDocument } from './office-engine.js';
import path from 'path';

/**
 * Parse Markdown text into structured segments for office-engine.
 * Supports: # ## ### headings, - bullet lists, 1. numbered items,
 * > blockquotes, [ ] / [x] checkboxes, and paragraphs.
 * Consecutive blank lines create paragraph breaks.
 */
function parseMarkdownToSegments(md) {
    const lines = md.split('\n');
    const segments = [];
    let currentParagraphLines = [];

    function flushParagraph() {
        if (currentParagraphLines.length > 0) {
            const text = currentParagraphLines.join('\n').trim();
            if (text) {
                segments.push({ type: 'paragraph', text });
            }
            currentParagraphLines = [];
        }
    }

    for (const rawLine of lines) {
        const line = rawLine.trimEnd();

        // Empty line → flush current paragraph
        if (line.trim() === '') {
            flushParagraph();
            continue;
        }

        // Headings
        const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
        if (headingMatch) {
            flushParagraph();
            segments.push({
                type: 'heading',
                level: headingMatch[1].length,
                text: headingMatch[2].trim()
            });
            continue;
        }

        // Checkbox items [ ] or [x]
        const checkboxMatch = line.match(/^[-*]\s*\[([ xX])\]\s+(.+)$/);
        if (checkboxMatch) {
            flushParagraph();
            const checked = checkboxMatch[1].toLowerCase() === 'x';
            const prefix = checked ? '☑ ' : '☐ ';
            // Collect consecutive checkboxes as a list
            if (segments.length > 0 && segments[segments.length - 1].type === 'checklist') {
                segments[segments.length - 1].items.push(prefix + checkboxMatch[2].trim());
            } else {
                segments.push({
                    type: 'checklist',
                    items: [prefix + checkboxMatch[2].trim()]
                });
            }
            continue;
        }

        // Bullet list items (- or *)
        const bulletMatch = line.match(/^[-*]\s+(.+)$/);
        if (bulletMatch) {
            flushParagraph();
            if (segments.length > 0 && segments[segments.length - 1].type === 'list') {
                segments[segments.length - 1].items.push(bulletMatch[1].trim());
            } else {
                segments.push({ type: 'list', items: [bulletMatch[1].trim()] });
            }
            continue;
        }

        // Numbered list items
        const numberedMatch = line.match(/^\d+\.\s+(.+)$/);
        if (numberedMatch) {
            flushParagraph();
            if (segments.length > 0 && segments[segments.length - 1].type === 'numbered-list') {
                segments[segments.length - 1].items.push(numberedMatch[1].trim());
            } else {
                segments.push({ type: 'numbered-list', items: [numberedMatch[1].trim()] });
            }
            continue;
        }

        // Blockquote
        const quoteMatch = line.match(/^>\s*(.*)$/);
        if (quoteMatch) {
            flushParagraph();
            segments.push({ type: 'quote', text: quoteMatch[1].trim() });
            continue;
        }

        // Regular text → accumulate into paragraph
        currentParagraphLines.push(line);
    }

    flushParagraph();
    return segments;
}

async function run() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === 'create-smart') {
        const params = JSON.parse(args[1]);
        const { output, title, content } = params;

        if (!output) {
            console.error('❌ Missing required parameter: output');
            process.exit(1);
        }

        // Parse markdown content into structured segments
        const segments = [];

        if (title) {
            segments.push({ type: 'heading', level: 1, text: title });
        }

        if (content) {
            const parsed = parseMarkdownToSegments(content);
            segments.push(...parsed);
        }

        if (segments.length === 0) {
            segments.push({ type: 'paragraph', text: '(Kein Inhalt übergeben)' });
        }

        const finalPath = await createDocument({
            output: output || '/tmp/auto-output.docx',
            title: title || 'raspb Document',
            segments
        });

        console.log(`✅ Document created: ${finalPath}`);

    } else {
        console.log("❌ Unknown Command. Available: create-smart");
        process.exit(1);
    }
}

run().catch(err => {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
});
