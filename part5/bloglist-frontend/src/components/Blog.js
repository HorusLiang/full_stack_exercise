import { useState} from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, name,handleLike}) => {

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
  
  const onRemoveClick=(blogId)=>{
    if (window.confirm("remove blog"+blog.name+" by "+blog.author)){
      blogService.deleteBlog(blogId)
    }
    
  }
  const currentName=name
    
  return (
    <div style={blogStyle} className="viewBlog">
      <div style={hideWhenVisible}>
          <div >{blog.title} {blog.author}</div> <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} clssName="hiddenBLog">
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <br/>
        {blog.url}
        <br/> 
        likes: {blog.likes} <button onClick={()=>handleLike(blog)}>like</button>
        <br/> 
        {blog !== null & blog.user!=null? <div>{blog.user.name}</div> : <div>user information is null</div>} 
        {blog !== null && blog.user !== null && currentName === blog.user.name && (<button onClick={() => onRemoveClick(blog.id)}>Remove</button>)}
      </div>
  </div>
)}

export default Blog