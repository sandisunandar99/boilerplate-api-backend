'use strict'
exports.plugin = {
  name: 'services',
  register: async (server, options) => {
    const services = [].concat(
      require('./users')
    )
    server.method(services)
    return 'ok'
  }
}
