import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'




test('Blog form closes when a new note is added', async () => {

  const createBlogPost = jest.fn()
  const user = userEvent.setup()
  render(<BlogForm
    createBlogPost={createBlogPost}

  />)
  const inputTitle = screen.getAllByPlaceholderText('title')
  const inputAuthor = screen.getAllByPlaceholderText('author')
  const inputUrl = screen.getAllByPlaceholderText('url')
  inputAuthor.value = ''
  inputUrl.value = ''
  inputTitle.value = ''
  const saveButton = screen.getByText('Save')

  await user.type(inputTitle[0], 'titleTest')
  await user.type(inputAuthor[0], 'authorTest')
  await user.type(inputUrl[0], 'urlTest')

  await user.click(saveButton)
  expect(createBlogPost.mock.calls).toHaveLength(1)

})