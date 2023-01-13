const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.json())

const middleware = require('./utils/middleware')

const cors = require('cors')
app.use(cors())
const config = require('./utils/config')
const logger = require('./utils/logger')
app.use(middleware.tokenExtractor)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB!')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

  
  const blogsRouter=require("./controllers/blogs")  
  const usersRouter = require('./controllers/users')
  app.use('/api/blogs', middleware.userExtractor,blogsRouter)
  app.use('/api/users', usersRouter) 

  const loginRouter = require('./controllers/login')
  app.use('/api/login', loginRouter) 

  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)

  module.exports = app