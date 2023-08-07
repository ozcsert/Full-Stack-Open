import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [buttonValue, setButtonValue ] = useState('view')
  const [likeCount, setLikeCount] = useState(blog.likes)

  const LikeIncrease = async (event) => {
    event.preventDefault()
    setLikeCount(likeCount + 1)
    const updatedLikes = {
      ...blog,
      likes: likeCount + 1,
    }
    updateLikes(updatedLikes)
    console.log(updatedLikes.id)
  }

  const blogDelete = (event) => {
    event.preventDefault()
    const blogDeleteObj = {
      ...blog
    }
    if (window.confirm(`Delete ${blogDeleteObj.title} ?`)) {
      deleteBlog(blogDeleteObj)
    }
  }
  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonValue(visible ? 'view': 'hide')
  }

  const blogStyle= {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const collapsedBlog = () => {
    return (
      <div>
        <div style={blogStyle} >
          <div>
            <br />{blog.title}
            <br />{blog.author}
          </div>
        </div>
      </div>
    )
  }

  const fullBlog = () => {
    return (
      <div >
        <div style={blogStyle} >
          <div >
            <br /> {blog.title}
            <br /> {blog.author}
            <br />{blog.url}
            <br />likes {likeCount}
            <button onClick={LikeIncrease} id="like-button" >like</button>
            <br />{blog.user.username}
            <button id="remove" onClick={blogDelete} >remove</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="blog">
      <div>
        <button onClick={toggleVisibility}>{buttonValue}</button>
      </div>
      {visible ? (
        fullBlog())
        : (
          collapsedBlog())}
    </div>
  )
}

export default Blog