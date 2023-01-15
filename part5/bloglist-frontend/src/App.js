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
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [user,url,blogs])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
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
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
      
  ) 
  const blogInfo=()=>{
    return(
      <div>
        {blogs.map(blog =>
          {
            return (
              <>
                <Blog key={blog.id} blog={blog} />
              </>
              )
          }
        )}
      </div>
    )
  }
  const handleCreate= async (event)=>{
    event.preventDefault()
    const blog={
      'title':title,
      'author':author,
      'url':url
    }
    await blogService.createNew(blog)
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
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in  <button onClick={logout}>Logout</button></p>
          <CreateForm 
            handleCreate={handleCreate}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
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
