const t = require('@babel/types');
const {decrypt} = require('./decrypt');

const varDeclarations = new Map();
let storedFunction = null;

const ExtractMainFunction = {
    VariableDeclarator(path) {
        if (
            t.isNewExpression(path.node.init) &&
            t.isMemberExpression(path.node.init.callee) &&
            t.isIdentifier(path.node.init.callee.object) &&
            t.isIdentifier(path.node.init.callee.property) &&
            t.isStringLiteral(path.node.init.arguments[0])
        ) {
            const key = path.node.init.arguments[0].value;
            storedFunction = path.node.init.callee.object.name + '.' + path.node.init.callee.property.name;
            varDeclarations.set(path.node.id.name, key);
            path.remove();
        }
    },
    ConditionalExpression(path) {
        if (
            t.isIdentifier(path.node.test) &&
            varDeclarations.has(path.node.test.name)
        ) {
            const key = varDeclarations.get(path.node.test.name);
            const decryptedValue = decrypt(key, path.node.consequent.arguments[0].value, path.node.consequent.arguments[1].value);

            path.replaceWith(t.stringLiteral(decryptedValue));
        }
    },
};

const ExtractOtherFunctions = {
    NewExpression(path) {
        if (
            t.isMemberExpression(path.node.callee) &&
            t.isIdentifier(path.node.callee.object) &&
            t.isIdentifier(path.node.callee.property) &&
            t.isStringLiteral(path.node.arguments[0])
        ) {
            foundStoredFunction = path.node.callee.object.name + '.' + path.node.callee.property.name;
            if (
                foundStoredFunction == storedFunction
            ) {
                const key = path.node.arguments[0].value;
                const variableName = path.parentPath.node.left.object.name + '.' + path.parentPath.node.left.property.name;
                varDeclarations.set(variableName, key);
                path.replaceWith(t.stringLiteral("ignore_me_removed"));
            }
        }
    },
    ConditionalExpression(path) {
        if (
            t.isLogicalExpression(path.node.test) &&
            t.isBinaryExpression(path.node.test.left) &&
            t.isBinaryExpression(path.node.test.right) &&
            t.isUnaryExpression(path.node.test.left.left) &&
            t.isUnaryExpression(path.node.test.right.left) &&
            path.node.test.left.left.operator === "typeof" &&
            path.node.test.right.left.operator === "typeof" &&
            t.isMemberExpression(path.node.test.left.left.argument) &&
            t.isMemberExpression(path.node.test.right.left.argument)
        ) {
            if (
                t.isCallExpression(path.node.consequent) &&
                t.isMemberExpression(path.node.consequent.callee) &&
                t.isNumericLiteral(path.node.consequent.arguments[0]) &&
                t.isNumericLiteral(path.node.consequent.arguments[1])
            ) {
                const arg1 = path.node.consequent.arguments[0].value;
                const arg2 = path.node.consequent.arguments[1].value;

                const functionName = path.node.test.left.left.argument.object.name + '.' + path.node.test.left.left.argument.property.name;

                const key = varDeclarations.get(functionName);
                const decryptedValue = decrypt(key, arg1, arg2);
                path.replaceWith(t.stringLiteral(decryptedValue));
            }
        }
    }

};

const CleanLastParts = {
    CallExpression(path) {
        if (
            t.isIdentifier(path.node.callee) &&
            path.node.callee.name === 'unescape' &&
            t.isStringLiteral(path.node.arguments[0])
        ) {
            const unescapedValue = unescape(path.node.arguments[0].value);
            path.replaceWith(t.stringLiteral(unescapedValue));
        }
    },
    AssignmentExpression(path) {
        if (
            t.isMemberExpression(path.node.left) &&
            t.isIdentifier(path.node.left.object) &&
            t.isIdentifier(path.node.left.property) &&
            t.isStringLiteral(path.node.right) &&
            path.node.right.value === "ignore_me_removed"
        ) {
            path.remove();
        }
    },
}

const CleanNumberCalls = {
    CallExpression(path) {
        if (
            t.isMemberExpression(path.node.callee) &&
            t.isCallExpression(path.node.callee.object) &&
            t.isIdentifier(path.node.callee.object.callee) &&
            path.node.callee.object.callee.name === 'Number' &&
            t.isNumericLiteral(path.node.callee.object.arguments[0]) &&
            t.isIdentifier(path.node.callee.property) &&
            path.node.callee.property.name === 'toString' &&
            t.isNumericLiteral(path.node.arguments[0])
        ) {
            const number = Number(path.node.callee.object.arguments[0].value);
            const radix = path.node.arguments[0].value;
            const result = number.toString(radix);
            path.replaceWith(t.stringLiteral(result));
        }
    }
}

const DeobfuscateBasicValues = {
    MemberExpression(path) {
        if (
            t.isArrayExpression(path.node.object) &&
            t.isArrayExpression(path.node.property) &&
            path.node.object.elements.length === 0 &&
            path.node.property.elements.length === 0
        ) {
            path.replaceWith(t.identifier('undefined'));
        }
    },
};

module.exports = {
    ExtractMainFunction,
    ExtractOtherFunctions,
    CleanLastParts,
    CleanNumberCalls,
    DeobfuscateBasicValues
};
