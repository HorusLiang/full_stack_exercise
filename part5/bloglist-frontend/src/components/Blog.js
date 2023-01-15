import { useState} from 'react'
const Blog = ({ blog }) => {

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
  // <div style={hideWhenVisible}>
  //       <button onClick={toggleVisibility}>{props.buttonLabel}</button>
  //     </div>
  //     <div style={showWhenVisible}>
  //       {props.children}
  //       <button onClick={toggleVisibility}>cancel</button>
  //     </div>
  //   </>
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
        likes: {blog.likes} <button>like</button>
      </div>
  </div>
)}

export default Blog