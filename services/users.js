'use strict'

const mongoose = require('mongoose')
const crypto = require('crypto')
require('../models/User')
const User = mongoose.model('User')


const listUser = async (user, query) => {

  const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    meta: '_meta'
  };

  const sorts = (query.sort == "desc" ? {_id:"desc"} : JSON.parse(query.sort));
  const options = {
    page: query.page,
    limit: query.limit,
    sort: sorts,
    leanWithId: true,
    customLabels: myCustomLabels,
  };

  let result_search
  if(query.search){
    var search_params = [
      { username : new RegExp(query.search,"i") },
      { fullname: new RegExp(query.search, "i") },
      { email: new RegExp(query.search, "i") }
    ];
    result_search = User.find().or(search_params).where("delete_status").ne("deleted");
  } else {
    result_search = User.find().where("delete_status").ne("deleted");
  }

  try {
    let getUser = await User.paginate(result_search, options)
    let result = {
      users: getUser.itemsList.map(users => users.toJSONFor()),
      _meta: getUser._meta,
    } 
    return result
  } catch (error) {
    return error
  }

  
}

const resetPasswordbyId = async (pay, id, category, user) => {
  try {
     const payloads = {};
     const payload = (pay == null ? {} : pay);
    if(category == 'reset'){
      if (typeof payload.password !== "undefined") {
        payload.salt = crypto.randomBytes(16).toString('hex');
        payload.hash = crypto.pbkdf2Sync(payload.password, payload.salt, 10000, 512, 'sha512').toString('hex');
      }
    }

    const params = Object.assign(payload,payloads);
    const result = await User.findByIdAndUpdate(id, { $set: params }, { new: true });
    return result
  } catch (error) {
    return error
  }
}

const getUserByUsername = async (username) => {
  try {
    let users = await User.findOne({username})
    return users
  } catch (error) {
    console.error(error);
  }
}

const getUserById = async (id) => {
  try {
    let result = await User.findById(id)
    return result.toJSONFor()
  } catch (error) {
    return error
  }
}

const createUser = async (payload) => {
  try {
    payload.salt = crypto.randomBytes(16).toString('hex')
    payload.hash = crypto.pbkdf2Sync(payload.password, payload.salt, 10000, 512, 'sha512').toString('hex')
    let user = await new User(payload)
    let result = await user.save()
    return result
  } catch (error) {
    return error
  }
}

const changePassword = async (payload, user) => {
  try {
    let passwords = user.setPassword(payload.password)

    let users = {
      fullname: payload.fullname ? payload.fullname : user.fullname,
      username: payload.username ? payload.username : user.username,
      password: passwords,
      email: payload.email ? payload.email : user.email,
      role: payload.role ? payload.role : user.role,
    }

    user = Object.assign(user, users);
    let result = await user.save()
    return result
  } catch (error) {
    return error
  }
  
}

const updateUsers = async (id, pay, category, author) =>{
  try {
    const payloads = {};
    const payload = (pay == null ? {} : pay );
    if(category == "delete"){
      const date = new Date();
      payloads.delete_status = "deleted";
      payloads.deletedAt = date.toISOString();
      payloads.deletedBy = author;
    }
    if(typeof payload.password !== "undefined"){
      payload.salt = crypto.randomBytes(16).toString('hex');
      payload.hash = crypto.pbkdf2Sync(payload.password, payload.salt, 10000, 512, 'sha512').toString('hex');
    }
    const params = Object.assign(payload,payloads);
    const result = await User.findByIdAndUpdate(id,
    { $set: params }, { new: true });
    return result
  } catch (error) {
    return error
  }
}


module.exports = [
  {
    name: 'services.users.listUser',
    method: listUser
  },
  {
    name: 'services.users.resetPasswordbyId',
    method: resetPasswordbyId
  },
  {
    name: 'services.users.getByUsername',
    method: getUserByUsername
  },
  {
    name: 'services.users.getById',
    method: getUserById
  },
  {
    name: 'services.users.create',
    method: createUser
  },
  {
    name: 'services.users.changePassword',
    method: changePassword
  },
  {
    name: 'services.users.updateUsers',
    method: updateUsers
  },
];

