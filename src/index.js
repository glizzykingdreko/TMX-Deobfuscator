const parser = require('@babel/parser');
const fs = require('fs');
const transform = require('./transformer');

function deobfuscate(file_name, output_file_name) {
    const code = fs.existsSync(file_name) ? fs.readFileSync(file_name, 'utf8') : file_name;
    const ast = parser.parse(code);
    const output_file = output_file_name || file_name.replace('.js', '_clean.js');

    const transformedCode = transform(ast);

    fs.writeFileSync(output_file, transformedCode);

    return transformedCode;
}

module.exports = {
    deobfuscate
};
