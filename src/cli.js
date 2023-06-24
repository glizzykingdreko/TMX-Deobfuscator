#!/usr/bin/env node

const tmx_deobfuscator = require('./index.js');

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('Please provide a file name');
    process.exit(1);
}

if (args[0] === '-h' || args[0] === '--help') {
    console.log('Usage: tmx-deobfuscator file.js [-o output.js]');
    process.exit(0);
}

const file_name = args[0];
const output_file_name = args[1] === '-o' || args[1] === '--output' ? args[2] : undefined;

tmx_deobfuscator.deobfuscator(file_name, output_file_name);