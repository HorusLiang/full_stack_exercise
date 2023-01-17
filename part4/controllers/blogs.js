const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs=await Blog.find({}).populate('user',{username:1,name:1,id:1})
    response.json(blogs)
      
  })

  

  blogsRouter.post('/',  middleware.userExtractor,async (request, response,next) => {
    let obj=request.body
    if(!obj.hasOwnProperty("title") || !obj.hasOwnProperty("url")){
      return response.status(400).json({error: 'title and url are required'})
    }

    if(!obj.hasOwnProperty("likes")){
      obj.likes=0
    }
    try{
      const blog = new Blog(obj)
      blog.user=request.user
      result=await blog.save()

      const user = await User.findById(blog.user);
      await user.blogs.push(result.id)
      await user.save()
      response.status(201).json(result)

    }catch(err){
      next(err)
    }
  })

  blogsRouter.delete('/:id',middleware.userExtractor,async (req, res, next)=>{
    try{
      const decodedToken = jwt.verify(req.token, process.env.SECRET)
      if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }

      const blog = await Blog.findById(req.params.id)

      
      const user = await User.findById(decodedToken.id)
      if ( blog.user.toString() !== user._id.toString() ){
        return res.status(404).json({error: 'permission denied'})
      }
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
      if (!deletedBlog) {
        return res.status(404).json({error: 'blog not found'})
      }
      res.status(204).end()

    }catch(err){
      next(err)
    }
  })

  blogsRouter.put('/:id', async (req, res) =>{
    const blog = req.body
    console.log("++",blog)
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,blog, { new: true })
    if (!updatedBlog) {
      return res.status(404).json({ error: 'blog not found' })
    }
    res.json(updatedBlog)
  })
  

  module.exports = blogsRouter