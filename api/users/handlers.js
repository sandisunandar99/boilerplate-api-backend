const replyHelper = require('../helpers')

module.exports = (server) => {
  function constructUserResponse(user) {
    let authUser = { 
      status : 200,
      message: true,
      data : user.toAuthJSON() 
    }
    return authUser
  }

  function constructUsersResponse(user) {
    let authUser = { 
      status : 200,
      message: true,
      data : user 
    }
    return authUser
  }

  return {
    /**
     * GET /api/users
     * @param {*} request
     * @param {*} reply
     */
    async getListUser (request, reply) {
      server.methods.services.users.listUser(
        request.auth.credentials.user,
        request.query, (err, listUser) => {
        if (err) return reply(replyHelper.constructErrorResponse(err)).code(422)
        return reply(constructUsersResponse(listUser))
      })
    },
    /**
     * GET /api/users/{id}
     * @param {*} request
     * @param {*} reply
     */
    async getUserById (request, reply) {
      server.methods.services.users.getById(
        request.params.id, "update", (err, listUser) => {
        if (err) return reply(replyHelper.constructErrorResponse(err)).code(422);
        return reply(constructUsersResponse(listUser));
      });
    },
    /**
     * PUT /api/users/reset/{id}
     * @param {*} request
     * @param {*} reply
     */
    async resetPasswordbyId(request, reply) {
      server.methods.services.users.resetPasswordbyId(
        request.payload, request.params.id, "reset", request.auth.credentials.user, (err, listUser) => {
        if (err) return reply(replyHelper.constructErrorResponse(err)).code(422);
        return reply(constructUsersResponse(listUser));
      });
    },
    /**
     * GET /api/users
     * @param {*} request
     * @param {*} reply
     */
    async getCurrentUser (request, reply) {
      return reply(constructUserResponse(request.auth.credentials.user))
    },
    /**
     * DELETE /api/users/{id}
     * @param {*} request
     * @param {*} reply
     */
    async deleteUsers (request, reply) {
      server.methods.services.users.updateUsers(
        request.params.id, request.payload, "delete",
        request.auth.credentials.user._id,
        (err, listUser) => {
        if (err) return reply(replyHelper.constructErrorResponse(err)).code(422);
        return reply(constructUsersResponse(listUser));
      })
    },
    /**
     * PUT /api/users/{id}
     * @param {*} request
     * @param {*} reply
     */
    async updateUsers (request, reply) {
      server.methods.services.users.updateUsers(
        request.params.id, request.payload, "update",
        request.auth.credentials.user._id,
        (err, listUser) => {
        if (err) return reply(replyHelper.constructErrorResponse(err)).code(422);
        return reply(constructUsersResponse(listUser));
      })
    },
    /**
     * PUT /api/users/change-password
     * @param {*} request
     * @param {*} reply
     */
    async changePassword(request, reply) {
      let payload = request.payload
      let user = request.auth.credentials.user
      server.methods.services.users.changePassword(user, payload, (err, updatedUser) => {
        if (err) return reply(replyHelper.constructErrorResponse(err)).code(422)
        return reply(constructUserResponse(updatedUser))
      })
    },
    /**
     * POST /api/users
     * @param {*} request
     * @param {*} reply
     */
    async registerUser(request, reply) {
      let payload = request.payload
      server.methods.services.users.create(payload, (err, user) => {
      // TODO: Better error response
        if (err) return reply(replyHelper.constructErrorResponse(err)).code(422)
        if (!user) return reply().code(422)
        return reply(constructUsersResponse(user))
      })
    },
    /**
     * POST /api/users/login
     * @param {*} request
     * @param {*} reply
     */
    async loginUser(request, reply) {
      let payload = request.payload
      server.methods.services.users.getByUsername(
        payload.username, 
        (err, user) => {
        if (err) return reply(replyHelper.constructErrorResponse(err)).code(422)

        if (!user) {
          return reply({
            "status":404,
            "message": 'username atau password salah!',
            "data": null
          }).code(404)
        }

        if (!user.validPassword(payload.password)) {
          return reply({
            "status":404,
            "message": 'username atau password salah!',
            "data": null
          }).code(401)
        }

        return reply(constructUserResponse(user))
      });
    },
  }//end retun
}
