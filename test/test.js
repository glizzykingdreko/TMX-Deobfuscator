const tmx_deob = require('../src/index.js');

console.log(tmx_deob);  // Log the imported module to ensure it's imported correctly

tmx_deob.decode('./test/example.js', './test/example_clean.js');  // Decode the test file

console.log('Done, file saved as example_clean.js')