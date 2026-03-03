import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const LICENSE_HEADER = `/**
 * Copyright (c) 2024 AiAdvisors Romuald Czlonkowski
 * Licensed under the Sustainable Use License v1.0
 */\n`;

const SRC_DIR = join(process.cwd(), 'src');

function walk(dir: string, callback: (path: string) => void) {
    readdirSync(dir).forEach(file => {
        const filePath = join(dir, file);
        if (statSync(filePath).isDirectory()) {
            walk(filePath, callback);
        } else if (extname(file) === '.ts') {
            callback(filePath);
        }
    });
}

console.log(`Processing files in ${SRC_DIR}...`);

let updatedCount = 0;
let skippedCount = 0;

walk(SRC_DIR, (filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    if (!content.includes('Sustainable Use License v1.0')) {
        writeFileSync(filePath, LICENSE_HEADER + content);
        updatedCount++;
        console.log(`Updated: ${filePath.replace(process.cwd(), '')}`);
    } else {
        skippedCount++;
    }
});

console.log(`\nFinished!`);
console.log(`Updated: ${updatedCount} files`);
console.log(`Skipped: ${skippedCount} files (already have header)`);
