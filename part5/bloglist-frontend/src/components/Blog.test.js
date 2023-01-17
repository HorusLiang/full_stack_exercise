import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 3,
        user:{
            name:'liang'
        }
    }
    const {container} = render(<Blog blog={blog} name='liang' handleLike={()=>{}} />)
    const title = container.querySelector('.viewBlog')
    const author = container.querySelector('.viewBlog')
    const url = container.querySelector('.hiddenBlog')
    const likes = container.querySelector('.hiddenBlog')
  

    expect(title).toBeDefined()
    expect(title).toHaveTextContent(blog.title)
    expect(author).toBeDefined()
    expect(author).toHaveTextContent(blog.author)
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })