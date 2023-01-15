import { useState} from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog,userId }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLike=(blog)=>{
    const newBlog={
      likes:blog.likes+1,
      author:blog.author,
      title:blog.title,
      url:blog.url
    }
    blogService.update(blog.id,newBlog)
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <br/>
        {blog.url}
        <br/> 
        likes: {blog.likes} <button onClick={()=>handleLike(blog)}>like</button>
      </div>
  </div>
)}

export default Blog