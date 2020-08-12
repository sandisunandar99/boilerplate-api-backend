const Helper = require('../helpers')
const { auth } = require('../../config/config')

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
      let credentials = request.auth.credentials.user
      let query = request.query
      try {
        let users = await server.methods.services.users.listUser(credentials, query)

        if (!users) return h.response().code(422).takeover()
        if (users.errors) return h.response(Helper.constructErrorResponse(users)).code(422)

        return h.response(constructUsersResponse(users))

      } catch (error) {
        console.error(error);
      }

    },
    /**
     * GET /api/users/{id}
     * @param {*} request
     * @param {*} h
     */
    async getUserById (request, h) {
      // server.methods.services.users.getById(
      //   request.params.id, "update", (err, listUser) => {
      //   if (err) return h.response(Helper.constructErrorResponse(err)).code(422);
      //   return h.response(constructUsersResponse(listUser));
      // });

      let id = request.params.id
      let method = "update"

      try {
        let users = await server.methods.services.users.getById(id, method)
        if (!users) return h.response().code(422).takeover()
        if (users.errors) return h.response(Helper.constructErrorResponse(users)).code(422)

        return h.response(constructUsersResponse(users))
      } catch (error) {
        console.error(error)
      }
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
      // server.methods.services.users.updateUsers(
      //   request.params.id, request.payload,
      //   "update",
      //   request.auth.credentials.user._id,
      //   (err, listUser) => {
      //   if (err) return h.response(Helper.constructErrorResponse(err)).code(422);
      //   return h.response(constructUsersResponse(listUser));
      // })
      let id = request.params.id
      let payload = request.payload
      let category = "update"
      let auhtor = request.auth.credentials.user._id
      try {
        let users = await server.methods.services.users.updateUsers(id, payload, category, auhtor)
        if (!users) return h.response().code(422).takeover()
        if (users.errors) return h.response(Helper.constructErrorResponse(users)).code(422)

        return h.response(constructUsersResponse(users))
      } catch (error) {
        console.error(error);
      }
      
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
      try {
        let users = await server.methods.services.users.create(payload)
        
        if (!users) return h.response().code(422).takeover()
        if (users.errors) return h.response(Helper.constructErrorResponse(users)).code(422)
        
        return h.response(constructUserResponse(users))
        
      } catch (error) {
        console.error(error);
      }
      
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
          console.error(error);
        }

    },
  }//end retun
}
