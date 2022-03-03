const fetch = require('node-fetch')
const log = require('../scripts/log-to-console')

module.exports = ApiCaller = async ({ url, config }) => {
  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`unexpected response ${response.statusText}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    log(error, 'red')
  }
}
