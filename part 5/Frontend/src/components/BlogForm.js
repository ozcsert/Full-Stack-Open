import React from 'react'
import { useState } from 'react'

const BlogForm = (
  { createBlogPost }
) => {

  //    const [newBlog, setNewBlog] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  //    const createBlog = ({target}) => {
  //        //target.preventDefault()
  //        const newBlogPost = {
  //          title : title,
  //          author : author,
  //          url : url
  //        }
  //
  //        switch (target.name) {
  //          case "title":
  //            setTitle(target.value);
  //          break;
  //          case "author":
  //            setAuthor(target.value);
  //            break;
  //          case "url":
  //            setUrl(target.value);
  //            break;
  //        }
  //        setNewBlog(newBlogPost)
  //        console.log(newBlog);
  //    }

  const blogSubmit = async (event) => {
    event.preventDefault()
    console.log({ title }, 'is being posted')
    createBlogPost({
      title : title,
      author : author,
      url : url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>

      <div>
        <h2>Create new</h2>
        <div>
          title:
          <input type="text" name="title" value={title} placeholder='title' onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div>
          author:
          <input type="text" name="author" value ={author} placeholder='author'onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div>
          url:
          <input type="text" name="url" value={url} placeholder='url' onChange={({ target }) => setUrl(target.value)}></input>
        </div>
        <button type="submit" onClick={blogSubmit}>Save</button>
      </div>
    </div>
  )
}

export default BlogForm