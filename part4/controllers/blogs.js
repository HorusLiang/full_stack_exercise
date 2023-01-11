const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/', (request, response) => {
    let obj=request.body
    if(!obj.hasOwnProperty("title") || !obj.hasOwnProperty("url")){
      return response.status(400).json({error: 'title and url are required'})
    }

    if(!obj.hasOwnProperty("likes")){
      obj.likes=0
    }

    const blog = new Blog(obj)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogsRouter