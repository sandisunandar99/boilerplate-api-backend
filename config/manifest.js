require('dotenv').config();

const envKey = key => {
  const env = process.env.NODE_ENV || 'development';

  const configuration = {
    development: {
      host: '0.0.0.0',
      port: 3333,
    },
    staging: {
      host: '192.168.1.1',
      port: 3333,
    },
    production: {
      host: process.env.HOST,
      port: process.env.PORT
    }
  };

  return configuration[env][key];
};

const manifest = {
  connections: [
    {
      host: envKey('host'),
      port: envKey('port'),
      routes: {
        security: {
          hsts: {
            maxAge: 15552000,
            includeSubdomains: true
          },
          xframe: true,
          xss: true,
          noOpen: false,
          noSniff: true
        },
        cors: {
          // origin: ["http://localhost:8080"], 
          origin: ["*"], 
          headers: [
            "Origin", 
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Origin", 
            "Accept", 
            "Authorization", 
            "Content-Type", 
            "If-None-Match", 
            "Accept-language"],
          credentials: true
        }
      },
      router: {
        stripTrailingSlash: true
      }
    }
  ],
  registrations: [
    {
      plugin: 'hapi-auth-jwt2'
    },
    {
      plugin: './auth'
    },
    {
      plugin: './services'
    },
    {
      plugin: './models'
    },
    {
      plugin: './api',
      options: { routes: { prefix: '/api' } }
    },
    {
      plugin: {
        register: 'good',
        options: {
          ops: { interval: 60000 },
          reporters: {
            console: [
              { module: 'good-squeeze', name: 'Squeeze', args: [{ error: '*' }] }, { module: 'good-console' }, 'stdout'
            ]
          }
        }
      }
    }
  ]
};

module.exports = manifest;