'use strict'
const Hapi = require('hapi')
const jwtPlugin = require('hapi-auth-jwt2')
// const authPlugin = require('../auth');
const apiPlugin = require('../api')
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()

const describe = lab.describe
const it = lab.it
const before = lab.before
const expect = Code.expect

describe('API', () => {
  let server

  before((done) => {
    // const plugins = [jwtPlugin, authPlugin, apiPlugin];
    const plugins = [jwtPlugin, apiPlugin]
    server = new Hapi.Server()
    server.connection({ port: 3333 })
    server.register(plugins, (err) => {
      if (err) {
        return done(err)
      }
      server.initialize(done)
    })
  })

  it('Known route should return http status 200', done => {
    server.inject('/api/status', response => {
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})
