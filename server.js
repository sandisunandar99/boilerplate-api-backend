'use strict';

const Glue = require('glue')
const manifest = require('./config/manifest')
const mongoose = require('mongoose')
const db = require('./config/config')

const startServer = async()=>{
  try {
    //start server
    const server = await Glue.compose(manifest, { relativeTo: __dirname })
    await server.start();
    console.info(`✅ Server started at: ${server.info.uri}`)

    // connection db 
    // mongoose.connect(db.database.uri, {useNewUrlParser: true, useUnifiedTopology: true});
    // mongoose.connection.on('error', console.error.bind(console, 'Connection error.'));
    // mongoose.connection.once('open', function() {console.log("✅  Connected to database. success!")})

    
  } catch (err) {
    console.error('Catch error on server start. Process will terminate now.', err);
    process.exit(1);
  }
}

startServer()