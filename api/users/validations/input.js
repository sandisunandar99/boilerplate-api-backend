const Joi = require('joi');
const {
  validateOptions,
  HeadersPayLoad
} = require('../../validations');
const _ = require('lodash');

// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------

const LoginPayload = {
  payload: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  }),
  options: validateOptions.options,
  failAction: validateOptions.failAction
};

const RegisterPayload = {
  payload: Joi.object().keys({
    fullname: Joi.string().required().allow(null, '').default('null'),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().allow(null, "").default("user"),
  }),
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

const UserQueryValidations = {
  query: {
    limit: Joi.number().integer().empty('', 10).default(10).description('limit result set'),
    offset: Joi.number().integer().default(0).description('number of record to skip'),
    page: Joi.number().integer().empty('', 1).default(1).description('number of page'),
    sort: Joi.string().empty('', 'desc').default('desc').description('sorting'),
    search: Joi.string().empty('', null).default('').description('search data'),
    role: Joi.string().empty('', null).default('').description('search data by Role'),
  },
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

const UpdatePayload = {
  headers: HeadersPayLoad,
  payload: Joi.object().keys({
    fullname: Joi.string(),
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().required(),
    role: Joi.string(),
  }),
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

const GetCurrentPayload = {
  headers: HeadersPayLoad,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

module.exports = {
  GetCurrentPayload,
  LoginPayload,
  RegisterPayload,
  UpdatePayload,
  UserQueryValidations
}