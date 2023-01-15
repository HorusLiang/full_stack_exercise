import Togglable from '../components/Togglable'
const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //<button>yes</button>
  return (
    <div style={blogStyle}>
      <div>
          {blog.title} {blog.author} 
          <Togglable buttonLabel='view'>
            <div>
              {blog.url}
              <br/> 
              likes: {blog.likes} <button>like</button>
            </div>
         </Togglable>
      </div>
  </div>
)}

export default Blog