'use strict'
const mongoose = require('mongoose')
const config = require('../config/config')
const bluebird = require('bluebird')

exports.plugin = {
  name: 'models',
  register: async (server, options) => {
    mongoose.Promise = bluebird
    mongoose.connect(config.database.uri, config.database.options, (err, db) => {
      if (err) console.log(err)
      require('./User')
      server.app.db = {
        link: db.db,
        User: db.model('User')
      }
      return 'ok'
    })
  }
}
