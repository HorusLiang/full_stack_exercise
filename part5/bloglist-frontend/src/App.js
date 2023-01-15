import { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'

import Notification from './components/Notification'
import Blog from './components/Blog'
// import Blog from './components/Blog'
// import blogService from './services/blogs'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs( blogs )
  //   )  
  // }, [])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
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
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
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
          {blogInfo()}
        </div>
      }
      
    </div>
    // <div>
    //   <h2>blogs</h2>
    //   {blogs.map(blog =>
    //     <Blog key={blog.id} blog={blog} />
    //   )}
    // </div>
  )
}

export default App
