const register = (server, options, next) => {

  const preResponse = (request, reply) => {
    let response = request.response
    // console.log('RESPONSE :', response);
    if (response.isBoom) {
      const reformated = {}
      reformated.status = response.output.statusCode
      reformated.message = response.output.payload.message
      reformated.data = null
      return reply(reformated).code(response.output.statusCode)
    }
    return reply.continue()
  }

  const onRequest = (request, reply) =>{
    // console.log('INFO:', request.info);
    return reply.continue()
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
    handler: (request, reply) => {
      return reply({status: `UP in ${format(require('os').uptime())}`})
    }
  })

  return next()
}

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register
