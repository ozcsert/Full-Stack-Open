import { useState } from "react"

const Blog = ({blog, username}) => {
  const [visible, setVisible] = useState(true)
  const [buttonValue, setButtonValue ] = useState("hide")

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
        <div style={blogStyle } >
        <div>
          <br /> {blog.title}
          <br /> {blog.author}
          <br />{blog.url}
          <br />likes {blog.likes}
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