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