const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs=await Blog.find({}).populate('user',{username:1,name:1,id:1})
    response.json(blogs)
      
  })
  
  blogsRouter.post('/', async (request, response) => {
    let obj=request.body
    if(!obj.hasOwnProperty("title") || !obj.hasOwnProperty("url")){
      return response.status(400).json({error: 'title and url are required'})
    }

    if(!obj.hasOwnProperty("likes")){
      obj.likes=0
    }

    const user = await User.findOne({});
    const blog = new Blog(obj)
    blog.user=user.id
  
    result=await blog.save()

    await user.blogs.push(result.id)
    await user.save()
    response.status(201).json(result)
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