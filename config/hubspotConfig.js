const Hubspot = require('hubspot')
const hubspot = new Hubspot({
  apiKey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8',
  checkLimit: false // (Optional) Specify whether to check the API limit on each call. Default: true
})

module.exports = {
    hubspot: hubspot
}