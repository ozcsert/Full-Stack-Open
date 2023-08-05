import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'

describe("<Blog />", () => {
let container

    test('renders blog.title&author when visibility is false', async () => {
        const blog = {
            title: 'blog title',
            author: "author",
            url: "www.motherfuckingwebsite.com",
            likes: "5",
            user: {username: "username", id: "123123123"}
        }
        container  = render(
        <Blog blog={blog} />).container

        const div = container.querySelector('.blog')
        expect(div).not.toHaveTextContent("www.motherfuckingwebsite.com" && "5")

        screen.debug()
    })  
    test('displays children when view button is clicked', async () => {
        const blog = {
            title: 'blog title',
            author: "author",
            url: "www.motherfuckingwebsite.com",
            likes: "5",
            user: {username: "username", id: "123123123"}
        }

        const mockHandler = jest.fn()
        container  = render(
        <Blog 
        toggleImportance={mockHandler} 
        blog={blog} 
        />).container
        
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent("www.motherfuckingwebsite.com" && "5")
        screen.debug()
    })

    test('the like button fires twice when clicked two times', async () => {
        
        const blog = {
            title: 'blog title',
            author: "author",
            url: "www.motherfuckingwebsite.com",
            likes: "5",
            user: {username: "username", id: "123123123"}
        }

        const mockHandler = jest.fn()
    
        const updateLikes = jest.fn()

        container  = render(
        <Blog 
        toggleImportance={mockHandler} 
        blog={blog} 
        updateLikes={updateLikes}
        />).container
        
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(updateLikes.mock.calls).toHaveLength(2)
        screen.debug()
        })
})      