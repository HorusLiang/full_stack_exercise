import { useState } from 'react' 
import PropTypes from 'prop-types'

const CreateForm=(
    {
      handleCreate,
    }
  )=>{
    const [loginVisible, setLoginVisible] = useState(false)
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const addNewBlog = (event) => {
      event.preventDefault()
      handleCreate({
        title,
        author,
        url,
      })
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    return (
      <>
        <div style={hideWhenVisible} className="hide">
          <button onClick={() => setLoginVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible} id='viewInfo'>
          <form onSubmit={addNewBlog} className="newBlogForm">
            <div>
              title
                <input
                type="text"
                className='title'
                value={title}
                placeholder='write title here'
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author
                <input
                className='author'
                type="text"
                value={author}
                placeholder='write author here'
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
                <input
                type="text"
                id='url'
                value={url}
                placeholder='write url here'
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit" id='create'>create</button>
            <br/>
            <button onClick={() => setLoginVisible(false)} type='button'>cancel</button>
            {/* if don't assign type value, then default will call handleCreate */}
          </form>
        </div>
      </>
    )
  }
  CreateForm.propTypes = {
    handleCreate: PropTypes.func.isRequired,
  }
  export default CreateForm