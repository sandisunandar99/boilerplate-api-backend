const Helper = require('../helpers')
const Bounce = require('@hapi/bounce')

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
     * @param {*} h
     */
    async getListUser (request, h) {
      server.methods.services.users.listUser(
        request.auth.credentials.user,
        request.query, (err, listUser) => {
        if (err) return h.response(Helper.constructErrorResponse(err)).code(422)
        return h.response(constructUsersResponse(listUser))
      })
    },
    /**
     * GET /api/users/{id}
     * @param {*} request
     * @param {*} h
     */
    async getUserById (request, h) {
      server.methods.services.users.getById(
        request.params.id, "update", (err, listUser) => {
        if (err) return h.response(Helper.constructErrorResponse(err)).code(422);
        return h.response(constructUsersResponse(listUser));
      });
    },
    /**
     * PUT /api/users/reset/{id}
     * @param {*} request
     * @param {*} h
     */
    async resetPasswordbyId(request, h) {
      server.methods.services.users.resetPasswordbyId(
        request.payload, request.params.id, "reset", request.auth.credentials.user, (err, listUser) => {
        if (err) return h.response(Helper.constructErrorResponse(err)).code(422);
        return h.response(constructUsersResponse(listUser));
      });
    },
    /**
     * GET /api/users
     * @param {*} request
     * @param {*} h
     */
    async getCurrentUser (request, h) {
      return h.response(constructUserResponse(request.auth.credentials.user))
    },
    /**
     * DELETE /api/users/{id}
     * @param {*} request
     * @param {*} h
     */
    async deleteUsers (request, h) {
      server.methods.services.users.updateUsers(
        request.params.id, request.payload, "delete",
        request.auth.credentials.user._id,
        (err, listUser) => {
        if (err) return h.response(Helper.constructErrorResponse(err)).code(422);
        return h.response(constructUsersResponse(listUser));
      })
    },
    /**
     * PUT /api/users/{id}
     * @param {*} request
     * @param {*} h
     */
    async updateUsers (request, h) {
      server.methods.services.users.updateUsers(
        request.params.id, request.payload, "update",
        request.auth.credentials.user._id,
        (err, listUser) => {
        if (err) return h.response(Helper.constructErrorResponse(err)).code(422);
        return h.response(constructUsersResponse(listUser));
      })
    },
    /**
     * PUT /api/users/change-password
     * @param {*} request
     * @param {*} h
     */
    async changePassword(request, h) {
      let payload = request.payload
      let user = request.auth.credentials.user
      server.methods.services.users.changePassword(user, payload, (err, updatedUser) => {
        if (err) return h.response(Helper.constructErrorResponse(err)).code(422)
        return h.response(constructUserResponse(updatedUser))
      })
    },
    /**
     * POST /api/users
     * @param {*} request
     * @param {*} h
     */
    async registerUser(request, h) {
      let payload = request.payload
      server.methods.services.users.create(payload, (err, user) => {
      // TODO: Better error response
        if (err) return h.response(Helper.constructErrorResponse(err)).code(422)
        if (!user) return h.response().code(422)
        return h.response(constructUserResponse(user))
      })
    },
    /**
     * POST /api/users/login
     * @param {*} request
     * @param {*} h
     */
    async loginUser(request, h) {
        let payload = request.payload
        try {
          let user = await server.methods.services.users.getByUsername(payload.username)
           if (!user) {
             return h.response({
               "status":404,
               "message": 'user not found!',
               "data": null
             }).code(404)
           }

           if (!user.validPassword(payload.password)) {
             return h.response({
               "status":404,
               "message": 'wrong username or password!',
               "data": null
             }).code(401)
           }   
          
           return h.response(constructUserResponse(user))
        } catch (error) {
           Bounce.rethrow(error, "system") // Rethrows system errors and ignores application errors
        }

    },
  }//end retun
}
