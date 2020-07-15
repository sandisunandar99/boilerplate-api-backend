const config = require('../config/config');
const mongoose = require('mongoose');
const Bounce = require('@hapi/bounce')

exports.plugin = {
  name: "auth",
  register: async (server, options) => {
    let validateFunc = async (decoded, request) => {
      let id = mongoose.Types.ObjectId(decoded.id);
      try {
        let user = await server.app.db.User.findById(id)
        
        if(!user){
           return { isValid: false };
        }

         return { isValid: true, credentials: {user}} ;
      } catch (error) {
        Bounce.rethrow(error, 'auth')
      }
    
    }
    
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

