exports.plugin ={
  name : "services", 
  register: async (server, options) => {
    let services = [].concat(
      require('./users')
    );
    server.method(services)

    return "ok"
  }

}
