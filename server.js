'use strict'
const Glue = require('glue')
const manifest = require('./config/manifest')

const startServer = async() => {
  try {
    // start server
    const server = await Glue.compose(manifest, { relativeTo: __dirname })
    await server.start()
    console.info(`✅ Server started at: ${server.info.uri}`)
  } catch (err) {
    console.error('Catch error on server start. Process will terminate now.', err)
    process.exit(1)
  }
}

startServer()