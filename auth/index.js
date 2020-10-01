'use strict'
const config = require('../config/config')
const mongoose = require('mongoose')

exports.plugin = {
  name: 'auth',
  register: async (server, options) => {
    const validateFunc = async (decoded, request) => {
      try {
        const id = mongoose.Types.ObjectId(decoded.id)
        const user = await server.app.db.User.findById(id)
        if (!user) {
          return { isValid: false }
        }
        return { isValid: true, credentials: { user } }
      } catch (error) {
        console.error(error);
      }
    }
    server.auth.strategy('jwt', 'jwt', {
      key: config.auth.secret,
      validate: validateFunc,
      verifyOptions: config.auth.verifyOptions,
      attemptToExtractTokenInPayload: true,
      tokenType: config.auth.tokenType
    })
    return 'ok'
  }
}
