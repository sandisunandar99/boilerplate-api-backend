'use strict';

const Glue = require('glue');
const manifest = require('./config/manifest');
const mongoose = require('mongoose');
const db = require('./config/config');

if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    "plugin": {
      "register": "blipp",
      "options": {}
    }
  });
}

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    console.log('server.register err:', err);
  }
  server.start(() => {
    console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
  });
});

 // cek koneksi database 
//  mongoose.connect(db.database.uri, {useNewUrlParser: true, useUnifiedTopology: true});
//  mongoose.connection.on('error', console.error.bind(console, 'Connection error.'));
//  mongoose.connection.once('open', function() {console.log("✅  Connected to database. success!");
//  }); 