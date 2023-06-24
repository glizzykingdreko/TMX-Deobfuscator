# TMX-Deobfuscator

## Description

`tmx-deobfuscator` is a quick and easy solution for deobfuscating ThreatMetrix dynamic files with no worries. 

## Installation

Install globally via npm:

```bash
npm install -g tmx-deobfuscator
```

## Usage
You can use `tmx-deobfuscator` both programmatically in code or via CLI.

### In Code
```javascript
const tmx_deobfuscator = require("tmx-deobfuscator");

const deobfuscated_code = tmx_deobfuscator.deobfuscate("example.js");

console.log(deobfuscated_code);
```
You can also specify an output file:
```javascript
const tmx_deobfuscator = require("tmx-deobfuscator");

tmx_deobfuscator.deobfuscate("example.js", "example_deobfuscated.js");
```
Or directly pass the code as a string:
```javascript
const tmx_deobfuscator = require("tmx-deobfuscator");

let code = require("fs").readFileSync("example.js", "utf8");

const deobfuscated_code = tmx_deobfuscator.deobfuscate(code);
```

### CLI
```bash
tmx_deobfuscator <input_file> -o <output_file>
```

## Contributing
Contributions, issues and feature requests are welcome. Feel free to check [issues page](/issues) if you want to contribute.

## License
This project is licensed under the [MIT License](/LICENSE).

## Connect with me
Stay connected and follow me on:

- [Twitter](https://twitter.com/glizzykingdreko)
- [Medium](https://medium.com/@glizzykingdreko)
- [GitHub](https://github.com/GlizzyKingDreko)
- [Mail](mailto:glizzykingdreko@protonmail.com)

For any questions or feedback, feel free to reach out!