import React from "react";
import { useState } from "react"

const Blog = ({blog, updateLikes}) => {
  const [visible, setVisible] = useState(true)
  const [buttonValue, setButtonValue ] = useState("hide")
  const [likeCount, setLikeCount] = useState(blog.likes)
  //const [updateLikes, setupdateLikes] = useState(updateLike)
  
  const LikeIncrease = async (event) => {
    event.preventDefault()
   // const blog = blogs.find(n => n.id === id)
    setLikeCount(likeCount + 1)
       const updatedLikes = {
        ...blog,
        likes: likeCount + 1,
        
      }
      updateLikes(updatedLikes)
     //  createLikes(updatedLikes)
     // console.log(updatedLikes);
      console.log(updatedLikes.id);
    }

//    const blogSubmit = async (event) => {
//        event.preventDefault()
//        console.log({title}, `is being posted`);
//            createBlogPost({
//                title : title,
//                author : author,
//                url : url
//            })
//            setTitle("")
//            setAuthor("")
//            setUrl("")
//        }
//  const showVisibility = {display: visible ? "": "none"}
//  const hideVisibility = {display: visible ? "none" : ""}

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonValue(visible ? "view": "hide")
  }

  //const toggleButtonValue = 

  const blogStyle= {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    //display: visible ? "": "none"
  }

  const collapsedBlog = () => {
    return (
      <div>
        <div style={blogStyle } >
        <div>
            {blog.title} 
          </div>
        </div>
      </div>
    )
  }

  //<br />{blog.user ? blog.user : ""}
//<br /> {blog.user.username}
  const fullBlog = () => {
    return (
      <div>
        <div style={blogStyle} >
        <div>
          <br /> {blog.title}
          <br /> {blog.author}
          <br />{blog.url}
          <br />likes {likeCount}
          <button onClick={LikeIncrease} >like</button>
          <br />{blog.user.username}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
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