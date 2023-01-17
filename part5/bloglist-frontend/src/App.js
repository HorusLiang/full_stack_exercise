import { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'

import Notification from './components/Notification'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
const App = () => {

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.setUserId(user.id)
      blogService.setName(user.name)
    }
  }, [])
  useEffect(() => {
    if(user){
      blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
    }
    
  }, [blogs, user])

  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      blogService.setUserId(user.id)
      blogService.setName(user.name)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const loginForm=()=>(
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
      
  )
  const handleLike=(blog)=>{
    const newBlog={
      likes:blog.likes+1,
      author:blog.author,
      title:blog.title,
      url:blog.url,
      user:blog.user.id
    }
    blogService.update(blog.id,newBlog)
  } 
  const blogInfo=()=>{
    const compare = (a, b) => {
      if (a.likes < b.likes) {
        return 1;
      }
      if (a.likes > b.likes) {
        return -1;
      }
      return 0;
    }
    const sortedBlogs = blogs.sort(compare)
    return(
      <div>
        {sortedBlogs.map(blog =>
          {
            return (
              <>
                <Blog key={blog.id} blog={blog}  name={user.name} handleLike={handleLike}/>
              </>
              )
        }
        )}
      </div>
    )
  }
  const handleCreate= async (blogObject)=>{
    console.log(blogObject)
    const blog={
      'title':blogObject.title,
      'author':blogObject.author,
      'url':blogObject.url
    }
    await blogService.createNew(blog)
    setBlogs(blogs.concat(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setErrorMessage("a new blog "+blog.title+ "by "+blog.author+" added")
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  
  const logout=()=>{
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div id='app'>
          <h2>blogs</h2>
          <p>{user.name} logged in  <button onClick={logout}>Logout</button></p>
          <CreateForm 
            handleCreate={handleCreate}
            title={title}
            author={author}
            url={url}
          />
          {blogInfo()}
        </div>
      }
      
    </div>
  )
}

export default App
