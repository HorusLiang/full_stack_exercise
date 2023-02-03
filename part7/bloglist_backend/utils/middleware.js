const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({
        error: 'malformatted id'
      })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({
        error: error.message 
      })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token from errorHandler'
      })
    }
  
    logger.error(error.message)
  
    next(error)
  }
  const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    try {
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            request.token = authorization.substring(7)
        }
        next();
      } catch (error) {
        return response.status(401).json({ error: 'invalid token from tokenExtractor' });
    }
};
const userExtractor=async(request, response, next)=>{
    try{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id);
        if(!user) {
            return response.status(401).json({ error: 'user not found' });
        }
        request.user= user._id.toString()
        next()
    }catch(err){
        next(err)
    }
}
  
    

  module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
  }