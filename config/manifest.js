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
  server: {
    host: envKey("host"),
    port: envKey("port"),
    routes: {
      security: {
        hsts: {
          maxAge: 15552000,
          includeSubdomains: true,
        },
        xframe: true,
        xss: true,
        noOpen: false,
        noSniff: true,
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
          "Accept-language",
        ],
        credentials: true,
      },
    },
    router: {
      stripTrailingSlash: true,
    },
  },
  register: {
    plugins: [
      { plugin: "hapi-auth-jwt2"},
      // {
      //   plugin: require("hapi-auth-basic")
      // },
      // {
      //   plugin: require("hapi-authorization")
      // },
      {
        plugin: "./auth",
      },
      {
        plugin: "./services",
      },
      {
        plugin: "./models",
      },
      {
        plugin: "./api",
        routes: {
          prefix: "/api"
        }
      },
      {
        plugin: require("good"),
        options: {
          ops: {
                interval: 60000
            },
            reporters: {
                myConsoleReporter: [
                    {
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{ log: '*', response: '*', ops: '*' }]
                    },
                    {
                        module: 'good-console'
                    },
                    'stdout'
                ]
            }
        }
      },
    ],
  },
};

if (!process.env.PRODUCTION) {
  manifest.register.plugins.push({
    plugin: "blipp",
    options: { showAuth: true }
  })
}


module.exports = manifest;