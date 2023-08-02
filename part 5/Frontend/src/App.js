import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setErrorMessage] = useState("er")
  const [blogLoading, setBlogLoading] = useState(false)
 // const [loginVisible, setLoginVisible]= useState(false)

//  useEffect(() => {
//
//    const loadData = async () => {
//    const response = await blogService.getAll()
//    setBlogs(response)
//    //console.log(blogs[blogs.length - 1].user.username);
//    if ( blogs[blogs.length - 1].user.username = undefined ) {
//      loadData()
//    } 
//}   }, [])

useEffect(() => {
  const loadData = async () => {
    const response = await blogService.getAll();
    const allBlogs = await blogs.concat(response)
    setBlogs(allBlogs)
    console.log(blogs.user);
  }
  loadData();
},[])


//  if ((blogs[blogs.length - 1].user.username) === undefined) {
//    console.log(blogs.forEach(blog => blog.user.username));
//    setBlogLoading(!blogLoading)
//    console.log(blogLoading);
//}



    //console.log(blogs[blogs.length - 1].user.username);

    // Check if the last blog's user.username is undefined
  //  if (blogs[blogs.length - 1].user.username === undefined) {
  //    // If it is undefined, recursively call loadData to try again
  //    loadData();
  //  }
  //};
  // Call loadData when the component mounts}

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //saves the token in the storage to the token state
      blogService.setToken(user.token)
      console.log(user.token);
    }
  }, [])

  const handleLogin = async (createUser) => {
    try {
      const user = await loginService.login(createUser)
      console.log(user);
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user))
        console.log(window.localStorage);
      setErrorMessage("Login successful!")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  } 

  const logOutHandler = () => {
    setUser(null)
    window.localStorage.clear()
    console.log(window.localStorage);
    console.log(user);
  }

  const blogSubmit = async (createBlogPost) => {
  try {
      const request = await blogService.create(createBlogPost)
      console.log(request)
        const allBlogs = await blogs.concat(request)
      setBlogs(allBlogs)
      console.log(blogs.map(blog => blog));
      setErrorMessage('Blog successfull!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  } catch (exception) {
    setErrorMessage('Blog incomplete')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

  const loginForm = () => {
    
    return (
    <div>
      <Togglable buttonLabel= "reveal">
        <LoginForm 
        createUser={handleLogin}/>
      </Togglable>
    </div> 
    )
    }

  const blogList = () => {
    return (
    <div>
      
      <p>Logged in as {user.name}</p>
      <button
      type='submit'
      value="logout"
      onClick={logOutHandler}>
        Logout
      </button>
      <Togglable buttonLabel="Create a blog">
      <BlogForm 

      createBlogPost={blogSubmit}
      />
      </Togglable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog 
        key={blog.id} 
        blog={blog} />
      )}
      </div>
    )
  }

return (
  <div>
    <p>{error}</p>
    {user ?  (
      blogList()
    ) : (
      loginForm()
    )}
    
  </div>
)
}

export default App