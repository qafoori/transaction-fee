require("./src/configs");
const App = require("./src/app");
const data = require(process.argv[2]);

console.time('asds')
new App(data).start();
console.timeEnd("asds");
