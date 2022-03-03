require('./src/configs')
const App = require('./src/app')
const data = require(process.argv[2])
const log = require('./src/scripts/log-to-console')

new App(data).start().then(commissions => log(commissions.join('\n'), 'magenta'))
