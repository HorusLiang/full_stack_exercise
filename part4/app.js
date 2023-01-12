const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.json())



const cors = require('cors')
app.use(cors())
const config = require('./utils/config')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB!')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

  
  const blogsRouter=require("./controllers/blogs")  
  const usersRouter = require('./controllers/users')
  app.use('/api/blogs', blogsRouter)
  app.use('/api/users', usersRouter) 

  module.exports = app