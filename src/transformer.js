const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const { ExtractMainFunction, ExtractOtherFunctions, 
    CleanLastParts, CleanNumberCalls, 
    DeobfuscateBasicValues } = require('./extractor');

function transform(ast) {
    traverse(ast, ExtractMainFunction);
    traverse(ast, ExtractOtherFunctions);
    traverse(ast, CleanLastParts);
    traverse(ast, CleanNumberCalls);
    traverse(ast, DeobfuscateBasicValues);

    // Generate the transformed code from the AST
    const { code: transformedCode } = generate(ast);

    return transformedCode;
}

module.exports = transform;
