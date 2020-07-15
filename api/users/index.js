 const Routes = require('./routes');
 
exports.plugin ={
   name : "users", 
   register: async (server, options) => {
      server.route(Routes(server));
      return "ok"
   }
}