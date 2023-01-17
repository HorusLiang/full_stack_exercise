import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Blog component only renders title and author by default', () => {
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
test('shows URL and likes when details button is clicked', async() => {
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
    const button = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(button)


    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')
    expect(url).toBeDefined()
    expect(url).toHaveTextContent(blog.url)
    expect(likes).toBeDefined()
    expect(likes).toHaveTextContent(blog.likes)
})