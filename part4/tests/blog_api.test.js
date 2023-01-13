const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

let token=""
const user = new User({username: 'root', password: 'sekret'})
beforeAll(async () => {
  await User.deleteMany({})
  await user.save()
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  console.log(user._id.toString())
  token = jwt.sign(userForToken, process.env.SECRET)
  
});
const initialTestBlogs = [
    {
      'title': 'Burns DAY',
      'author': 'Robert Scalds',
      'url': 'http://burns.gov/blog/woohoo',
      'likes': 9,
      'user':user._id.toString(),
    },
    {
      'title': 'Burns NIGHT',
      'author': 'Robert Burns',
      'url': 'http://burns.gov/blog/woohaa',
      'likes': 1,
      'user':user._id.toString(),
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
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
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
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(blog)
    expect(response.statusCode).toBe(201)
    const currentBlogCount = await Blog.countDocuments()
    expect(currentBlogCount).toBe(3)

    expect(response.body.title).toEqual(`my tempt blog`)
    
})

// need authentication update to the code
test("likes is default to the value 0 if missing",async()=>{
    const blog={
        "title":"my tempt blog",
        "author":"liang",
        "url":"www.google.cn",
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(blog)

    expect(response.statusCode).toBe(201)
    const currentBlogCount = await Blog.countDocuments()
    expect(currentBlogCount).toBe(3)

    expect(response.body.likes).toBe(0)
    
})
test("adding a blog fails if token not provided",async()=>{
  const blog={
      "title":"my tempt blog",
      "author":"liang",
      "url":"www.google.cn",
      'likes':1
  }

  const response = await api
    .post('/api/blogs')
    .set('Content-Type', 'application/json')
    .send(blog)
    .expect(401)
})

test("if the title or url properties are missing from the request data, request with the status code 400 Bad Request.",async()=>{
    const blog={
        "title":"my tempt blog",
        "author":"liang",
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(blog)

    expect(response.statusCode).toBe(400)
    
})
test('adding a blog fails if token not provided', async () => {
  const newBlog = {
      title: 'blog title',
      author: 'author',
      url: 'https://blog.com',
      likes: 1,
  }
  await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(401)
});

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
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .expect(204)

    const blogAtEnd= await blogsInDb()
    expect(blogAtEnd).toHaveLength(
        lengthStart - 1
    )
    expect(blogAtEnd).not.toContain(blogToDelete)
    
})

 // need authentication update to the code
test("update is successful or not.",async()=>{

    const blogAtStart= await blogsInDb()
    const lengthStart=blogAtStart.length

    const blogToUpdate=blogAtStart[0]
    blogToUpdate.likes=blogToUpdate.likes+1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(blogToUpdate)
      .expect(200)

    const blogAtEnd= await blogsInDb()
    const blogUpdated=blogAtEnd[0]

    expect(blogAtEnd).toHaveLength(
        lengthStart
    )

    expect(blogUpdated.likes).toBe(blogToUpdate.likes)
})


