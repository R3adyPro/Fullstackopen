import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogForm from "./newBlogForm"

describe('testing blog', () => {
    let component
    const blog = {
        title: "Testi",
        author: 'author',
        url: 'www.testi.com',
        likes: 1,
        user: {
            username: 'testi',
            name: 'testi'
        }
      }
    const likemockHandler = jest.fn()

    beforeEach(() => {
        component = render(<Blog blog={blog} sendLike={likemockHandler}/>)
    })

    test('render title', () => {
        expect(component.container.querySelector('.title')).toHaveTextContent(
            blog.title
        )
      })
    
    test('testing show and hide', () => {
        const button = screen.getByText('show')
        fireEvent.click(button)

        const blogData = component.container.querySelector('.blogData')
        expect(blogData).toBeInTheDocument
    })

    test('like button pressed twice', () => {
        const button = screen.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(likemockHandler.mock.calls).toHaveLength(2)
    })
})

describe('newBlogForm tests', () => {
    test('blogform', async () => {
        const createBlog = jest.fn()
        const user = userEvent.setup()

        const { container } = render(<NewBlogForm createBlog={createBlog}/>)
    
        const title = container.querySelector("input[name='title']")
        const author = container.querySelector("input[name='author']")
        const url = container.querySelector("input[name='url']")
        const createButton = screen.getByText('create')

        await user.type(title, 'testi')
        await user.type(author, 'testi')
        await user.type(url, 'www.testi.com')
        await user.click(createButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0]).toBe('title')
        expect(createBlog.mock.calls[0][1]).toBe('testi')
        expect(createBlog.mock.calls[0][2]).toBe('www.title.com')
    })
})