import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'
import { useState, useEffect } from 'react'

describe('<CreateForm />', () => {
    let container
    let mockHandleCreate
    beforeEach(() => {
        mockHandleCreate = jest.fn()
        container=render(<CreateForm 
            handleCreate={mockHandleCreate} 
          />).container
    })
  
    test('at start the main contents are not displayed', () => {
      const div = container.querySelector('.view')
      expect(div).toHaveStyle('display: none')
    })
  
    test('after clicking the button, main contents are displayed', async () => {
      const user = userEvent.setup()
      const button = screen.getByText('create new blog')
      await user.click(button)
  
      const div = container.querySelector('.view')
      expect(div).not.toHaveStyle('display: none')
    })

    test('check the input works fine', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('create new blog')
        await user.click(button)

        const titleInput = screen.getByPlaceholderText('write title here')
        const authorInput = screen.getByPlaceholderText('write author here')
        const urlInput = screen.getByPlaceholderText('write url here')

        await user.type(titleInput, 'Test Title')
        await user.type(authorInput, 'Test Author')
        await user.type(urlInput, 'http://test.com')

        const submitButton = screen.getByText('create')
        await user.click(submitButton)

        expect(mockHandleCreate.mock.calls[0][0].title).toBe("Test Title")
        expect(mockHandleCreate.mock.calls[0][0].author).toBe('Test Author')
        expect(mockHandleCreate.mock.calls[0][0].url).toBe('http://test.com')
      })
  })