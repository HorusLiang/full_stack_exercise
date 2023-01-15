import { useState } from 'react' 
const CreateForm=(
    {
      handleCreate,
      handleTitleChange,
      handleAuthorChange,
      handleUrlChange,
      title,
      author,
      url
    }
  )=>{
    const [loginVisible, setLoginVisible] = useState(false)
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <form onSubmit={handleCreate}>
            <div>
              title
                <input
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div>
              author
                <input
                type="text"
                value={author}
                onChange={handleAuthorChange}
              />
            </div>
            <div>
              url
                <input
                type="text"
                value={url}
                onChange={handleUrlChange}
              />
            </div>
            <button type="submit">create</button>
            <br/>
            <button onClick={() => setLoginVisible(false)} type='button'>cancel</button> 
            {/* if don't assign type value, then default will call handleCreate */}
          </form>
        </div>
      </>
    )
  }
  export default CreateForm