'use strict'
const jsonParse = (str) => {
  try {
      return JSON.parse(str)
  } catch (e) {
      return false
  }
}

module.exports = { jsonParse }