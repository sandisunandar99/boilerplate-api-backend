const mongoose = require('mongoose');
const config = require('../config/config');
const bluebird = require('bluebird');

const register = (server, options, next) => {
  mongoose.Promise = bluebird;
  mongoose.connect(config.database.uri, config.database.options, (err, db) => {
    if (err) console.log(err);

    require('./User')


    server.app.db = {
      link: db.db,
      User: db.model('User')
    };

    return next();
  });
};

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register;
