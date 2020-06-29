const config = require('../config/config');
const mongoose = require('mongoose');

exports.plugin = {
  name: "auth",
  register: async (server, options) => {
    var validateFunc = (decoded, request, callback) => {
      var id = mongoose.Types.ObjectId(decoded.id);

      server.app.db.User.findById(id, (err, user) => {
        if (err) return callback(err, false);

        if (!user) {
          return callback(null, false);
        }
        
        return callback(null, true, {user});
      });
    };

    server.auth.strategy('jwt', 'jwt', {
      key: config.auth.secret,
      validate: validateFunc,
      verifyOptions: config.auth.verifyOptions,
      attemptToExtractTokenInPayload: true,
      tokenType: config.auth.tokenType,
    });

    return "ok"
  }
}

