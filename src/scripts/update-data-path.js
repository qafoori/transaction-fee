const { writeFile } = require('fs')
const packageFile = require('../../package.json')
const newDataPath = process.argv[2] || './src/example-inputs.json'

packageFile.scripts.start = `node app.js ${newDataPath}`
packageFile.scripts.dev = `nodemon app.js ${newDataPath}`
packageFile.scripts['data:check'] = `cat ${newDataPath}`
packageFile.scripts['data:edit'] = `sudo vim ${newDataPath}`

writeFile('package.json', JSON.stringify(packageFile, null, 2), console.log)
