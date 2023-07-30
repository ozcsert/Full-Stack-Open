const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error : error.message })
    }else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: error.message })
    } next(error)
  }

  //isoletes the token(that was created in the login router)
//from the authorization header.

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')) {
    request["token"] = authorization.replace('Bearer ', '')
    }  
    next()
}




  

module.exports = { errorHandler, tokenExtractor }