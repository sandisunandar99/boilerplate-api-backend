const inputValidations = require('./validations/input');
const outputValidations = require('./validations/output');


module.exports = (server) => {
  const handlers = require('./handlers')(server)

  const CheckRoleView = require('./route_prerequesites').CheckRoleView(server)
  const CheckRoleCreate = require('./route_prerequesites').CheckRoleCreate(server)
  const CheckRoleUpdate = require('./route_prerequesites').CheckRoleUpdate(server)
  const CheckRoleDelete = require('./route_prerequesites').CheckRoleDelete(server)
  const CheckRoleResetPasswordMe = require('./route_prerequesites').CheckRoleResetPasswordMe(server)

  return [
       // Register
    {
      method: 'POST',
      path: '/register',
      config: {
        validate: inputValidations.RegisterPayload,
        response: outputValidations.AuthOnRegisterOutputValidationConfig,
        description: 'register user',
        tags: ['api', 'users'],
      },
      handler: handlers.registerUser
    },
    // Login
    {
      method: 'POST',
      path: '/login',
      options: {
        validate: inputValidations.LoginPayload,
        response: outputValidations.AuthOnLoginOutputValidationConfig,
        description: 'Login  user',
        tags: ['api', 'users'],
      },
      handler: handlers.loginUser
    },
    // Get list user
    {
      method: 'GET',
      path: '/users',
      config: {
        auth: 'jwt',
        description: 'Get list user',
        validate: inputValidations.UserQueryValidations,
        tags: ['api', 'users'],
         pre: [
           CheckRoleView
         ]
      },
      handler: handlers.getListUser
    },
    // Get user by id
    {
      method: 'GET',
      path: '/users/{id}',
      config: {
        auth: 'jwt',
        description: 'Get user by id',
        tags: ['api', 'users'],
         pre: [
           CheckRoleView
         ]
      },
      handler: handlers.getUserById
    },
    // Reset password by id
    {
      method: 'PUT',
      path: '/users/change-password/{id}',
      config: {
        auth: 'jwt',
        description: 'Reset password by id (admin)',
        tags: ['api', 'users'],
         pre: [
           CheckRoleUpdate
         ]
      },
      handler: handlers.resetPasswordbyId
    },
    // Get current user
    {
      method: 'GET',
      path: '/users/info',
      config: {
        auth: 'jwt',
        validate: inputValidations.GetCurrentPayload,
        response: outputValidations.AuthOutputValidationConfig,
        description: 'Get current info user',
        tags: ['api', 'users'],
      },
      handler: handlers.getCurrentUser
    },
    // Update user
    {
      method: 'PUT',
      path: '/users/change-password',
      config: {
        auth: 'jwt',
        validate: inputValidations.UpdatePayload,
        response: outputValidations.AuthOnPutOutputValidationConfig,
        description: 'Reset password my own',
        tags: ['api', 'users'],
        pre: [
          CheckRoleResetPasswordMe
        ]
      },
      handler: handlers.changePassword
    },
    // Soft delete user
    {
      method: 'DELETE',
      path: '/users/{id}',
      config: {
        auth: 'jwt',
        description: 'Soft delete user',
        tags: ['api', 'users'],
        pre: [
          CheckRoleDelete
        ]
      },
      handler: handlers.deleteUsers
    },
    // UPDATE user
    {
      method: 'PUT',
      path: '/users/{id}',
      config: {
        auth: 'jwt',
        description: 'update user',
        tags: ['api', 'users'],
        pre: [
          CheckRoleUpdate
        ]
      },
      handler: handlers.updateUsers
    },

  ]
}
