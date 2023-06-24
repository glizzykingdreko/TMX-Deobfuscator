const parser = require('@babel/parser');
const fs = require('fs');
const transform = require('./transformer');

function decode(file_name, output_file_name) {
    const code = fs.readFileSync(file_name, 'utf8');
    const ast = parser.parse(code);
    const output_file = output_file_name || file_name.replace('.js', '_clean.js');

    const transformedCode = transform(ast);

    fs.writeFileSync(output_file, transformedCode);
}

module.exports = {
    decode
};
