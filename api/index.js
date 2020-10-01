exports.plugin = {
  name: "API",
  register: async (server, options) => {

    const preResponse = (request, h) => {
      let response = request.response
      // console.log('RESPONSE :', response)
      if (response.isBoom) {
        const reformated = {}
        reformated.status = response.output.statusCode
        reformated.message = response.output.payload.message
        reformated.data = null
        return h.response(reformated).code(response.output.statusCode)
      }
      return h.continue
    }

    const onRequest = (request, h) =>{
      // console.log('INFO:', request.info);
      return h.continue
    }

    const format = (seconds) => {
      const pad = (s) => {
        return (s < 10 ? '0' : '') + s;
      }
      var hours = Math.floor(seconds / (60*60));
      var minutes = Math.floor(seconds % (60*60) / 60);
      var seconds = Math.floor(seconds % 60);
    
      return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
    }

    server.register(require('./users'))

    server.ext('onPreResponse', preResponse)
    server.ext('onRequest', onRequest)

    server.route({
      method: 'GET',
      path: '/status',
      config: {
        description: 'Check status',
        notes: 'Check status of the API',
        tags: ['api', 'status']
      },
      handler: async (request, h) => { 
        return h.response({status: `UP in ${format(require('os').uptime())}`})
      }
    })

    return "ok"
  }
}//end export


