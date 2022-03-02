const colors = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
}

const log = (data, color) => {
  if (!color) {
    return console.log(data)
  }
  return console.log(`${colors[color]}%s\x1b[0m`, data)
}

module.exports = log
