const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/blog')

const initialTestBlogs = [
    {
      'title': 'Burns DAY',
      'author': 'Robert Scalds',
      'url': 'http://burns.gov/blog/woohoo',
      'likes': 9,
      'id': '5efbc1008d691b6a74cb5991'
    },
    {
      'title': 'Burns NIGHT',
      'author': 'Robert Burns',
      'url': 'http://burns.gov/blog/woohaa',
      'likes': 1,
      'id': '5f0637defbc4d6377999a4d8'
    }
  ]
  beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(initialTestBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialTestBlogs[1])
    await blogObject.save()
  })

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

test("verifies identifier property of the blog posts id exists",async()=>{
    const blogPost = await Blog.findOne();
    expect(blogPost.id).toBeDefined();
})

test("making an HTTP POST request to the /api/blogs URL successfully creates a new blog post",async()=>{
    const blog={
        "title":"my tempt blog",
        "author":"liang",
        "url":"www.google.cn",
        "likes":5
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
    expect(response.statusCode).toBe(201)
    const currentBlogCount = await Blog.countDocuments()
    expect(currentBlogCount).toBe(3)

    expect(response.body.title).toEqual(`my tempt blog`)
    
})

test("likes is default to the value 0 if missing",async()=>{
    const blog={
        "title":"my tempt blog",
        "author":"liang",
        "url":"www.google.cn",
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)

    expect(response.statusCode).toBe(201)
    const currentBlogCount = await Blog.countDocuments()
    expect(currentBlogCount).toBe(3)

    expect(response.body.likes).toBe(0)
    
})

test("if the title or url properties are missing from the request data, request with the status code 400 Bad Request.",async()=>{
    const blog={
        "title":"my tempt blog",
        "author":"liang",
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)

    expect(response.statusCode).toBe(400)
    
})

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

test("delete is successful or not.",async()=>{

    const blogAtStart= await blogsInDb()
    const lengthStart=blogAtStart.length

    const blogToDelete=blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogAtEnd= await blogsInDb()
    expect(blogAtEnd).toHaveLength(
        lengthStart - 1
    )
    expect(blogAtEnd).not.toContain(blogToDelete)
    
})

test("update is successful or not.",async()=>{

    const blogAtStart= await blogsInDb()
    const lengthStart=blogAtStart.length

    const blogToUpdate=blogAtStart[0]
    blogToUpdate.likes=blogToUpdate.likes+1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogAtEnd= await blogsInDb()
    const blogUpdated=blogAtEnd[0]

    expect(blogAtEnd).toHaveLength(
        lengthStart
    )

    expect(blogUpdated.likes).toBe(blogToUpdate.likes)
})