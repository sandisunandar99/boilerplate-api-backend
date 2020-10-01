'use strict'
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const mongoosePaginate = require('mongoose-paginate-v2')

const UserSchema = new mongoose.Schema({
  fullname: String,
  username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
  email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
  role: { type: String, lowercase: true, default: 'user' },
  hash: String,
  salt: String,
  delete_status: { type: String, default: null },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true })

UserSchema.plugin(uniqueValidator, {
  message: 'user is existed!'
});
UserSchema.index({email: 1}, {unique: true})
UserSchema.index({username: 1},{unique: true})
UserSchema.plugin(mongoosePaginate)

UserSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}
UserSchema.methods.generateJWT = function () {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, config.auth.secret, { algorithm: config.auth.algorithm })
}

UserSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    fullname: this.fullname,
    username: this.username,
    email: this.email,
    role: this.role,
    token: this.generateJWT()
  }
}

UserSchema.methods.toJSONFor = function () {
  return {
    id: this._id,
    fullname: this.fullname,
    username: this.username,
    email: this.email,
    role: this.role
  }
}

module.exports = mongoose.model('User', UserSchema)
