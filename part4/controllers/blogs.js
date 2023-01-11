const blogsRouter = require('express').Router()
const { request } = require('../app')
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
  blogsRouter.delete('/:id',async (req, res)=>{
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
    if (!deletedBlog) {
      return res.status(404).json({error: 'blog not found'})
    }
    res.status(204).end()
  })

  blogsRouter.put('/:id', async (req, res) =>{
    const blog = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,blog, { new: true })
    if (!updatedBlog) {
      return res.status(404).json({ error: 'blog not found' })
    }
    res.json(updatedBlog)
  })

  module.exports = blogsRouter