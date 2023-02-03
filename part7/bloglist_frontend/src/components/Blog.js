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
    <div style={blogStyle} id='blog' >
      <div style={hideWhenVisible} className="viewBlog" id='blogItem'>
          <div >{blog.title} {blog.author}</div> <button onClick={toggleVisibility} id='view'>view</button>
      </div>
      <div style={showWhenVisible} clssName="hiddenBLog">
        <div>{blog.title} {blog.author}</div> <button onClick={toggleVisibility}>hide</button>
        <br/>
        <div className="url">{blog.url}</div>
        <br/> 
        <div className="likes" id='likes'>likes: {blog.likes}</div> <button onClick={()=>handleLike(blog)} id='like'>like</button>
        <br/> 
        {blog !== null & blog.user!=null? <div>{blog.user.name}</div> : <div>user information is null</div>} 
        {blog !== null && blog.user !== null && currentName === blog.user.name && (<button onClick={() => onRemoveClick(blog.id)} id='remove'>remove</button>)}
      </div>
  </div>
)}

export default Blog