import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
test('renders content', () => {
    const blog = {
        title: "blogtest",
        author: "authortest",
        url: "urltest",
        likes: 12
    }

    render(<Blog blog={blog} />)

    const element = screen.getAllByText('blogtest')

    expect(element).toBeDefined()
})
test('clicking the button show likes author and url', async () => {
    const blog = {
        title: "blogtest",
        author: "authortest",
        url: "urltest",
        likes: 12
    }


    const mockHandler = jest.fn()

    const { container } = render(
        <Blog blog={blog} toggleVisibility={mockHandler} updateBlog={mockHandler} />
    )
    const user = userEvent.setup()
    const button = container.querySelector("#viewbutton")
    await user.click(button)

    const author = screen.getAllByText('authortest')
    expect(author).toBeDefined()
    const url = screen.getAllByText('urltest')
    expect(url).toBeDefined()
    const likes = screen.getAllByText('12')
    expect(likes).toBeDefined()
})
test('clicking two likes add two likes', async () => {
    const blog = {
        title: "blogtest",
        author: "authortest",
        url: "urltest",
        likes: 12
    }
    const mockHandler = jest.fn()
    render(
        <Blog blog={blog} toggleVisibility={mockHandler} updateBlog={mockHandler} />)
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})
test('<Blogform> create the right blog', async () => {
    const createBlog = jest.fn()
    const setInfo = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} setInfoMessage={setInfo} />)

    const input = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await user.type(input[0], 'testtitle')
    await user.type(input[1], 'testauthor')
    await user.type(input[2], 'testurl')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'testtitle',
        author: 'testauthor',
        url: 'testurl'
    })

})
