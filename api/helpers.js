  // --------------------------------------------------
  //    Helpers
  // --------------------------------------------------

  function joiResponseErrorHandler (err) {
    if (err.isJoi) {
      let response ={
        status: 422,
        message: {},
        data: null
      }

      err.details.forEach((error) => {
        response.message = error.message
      })

      return response
    }

    return null
  }

  function defaultResponseErrorHandler (err) {
    let response ={
      status: 422,
      message: {},
      data: null
    }

    response.message = err.message

    return response
  }

  function mongooseResponseValidationErrorHandler (err) {
    if (err.name && err.name === 'ValidationError') {
      let response ={
          status: 422,
          message:{},
          data: null
      }

      let keys = Object.keys(err.errors)
      for (let index in keys) {
        let key = keys[index]
        if (err.errors[key].hasOwnProperty('message')) {
          response.message = key +' '+err.errors[key].value +' '+ err.errors[key].message
        }
      }

      return response
    }

    return null
  }

  const errorHandlers = [joiResponseErrorHandler, mongooseResponseValidationErrorHandler, defaultResponseErrorHandler]

  const constructErrorResponse = (err) => {
    let response
    for (let handler in errorHandlers) {
      let handlerFn = errorHandlers[handler]

      if (typeof (handlerFn) === 'function') {
        response = handlerFn(err)
        if (response !== null) break
      }
    }
    
    return response
  }

  module.exports = {
    constructErrorResponse
  }
