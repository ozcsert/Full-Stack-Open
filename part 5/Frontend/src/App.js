import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
//import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [error, setErrorMessage] = useState("er")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [loginVisible, setLoginVisible]= useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logged in with", {username}, {password});

    try {
      const user = await loginService.login({
        username, password
      })
      console.log(user);
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
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

  const createBlog = ({target}) => {
    //target.preventDefault()
    const blogPost = {
      title : title,
      author : author,
      url : url
    }
    
    switch (target.name) {
      case "title":
        setTitle(target.value);
       break;
      case "author":
        setAuthor(target.value);
        break;
      case "url":
        setUrl(target.value);
        break;
    }
    
    console.log(blogPost);
    setNewBlog(blogPost)
    console.log(newBlog);

  }

  const blogSubmit = async () => {
  try {
      const request = await blogService.create(newBlog)
      console.log(request)
      setBlogs(blogs.concat(newBlog))
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
//}
//noteService
//.create(noteObject)
//.then(returnedNote => {
//  setNotes(notes.concat(returnedNote))
//  setNewNote('')

  const handleUsernameChange = (event) => {
    event.preventDefault()
    console.log(event.target.value);
    setUsername(event.target.value)
    console.log(user);
  }

  const handlePasswordChange = (event) => {
    event.preventDefault()
    console.log(event.target.value);
    setPassword(event.target.value)
    console.log(user);
  }

//
//  const loginForm = () => {
//
//    return (
//    
//     <div>
//      <LoginForm 
//      username={username}
//      password={password}
//      handleUsernameChange={handleUsernameChange}
//      handlePasswordChange={handlePasswordChange}
//      handleSubmit={(event) => {event.preventDefault()}}
//      />
//      </div>
//    )
//  }

const loginForm = () => {
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>
      <div style={showWhenVisible}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}


//  const loginForm = () => {
//  
//
//    return (
//   
//        <div>
//            <h1>Login</h1>
//            <form onSubmit={handleLogin}>
//            <div>
//             username
//             <input
//             type="text"
//             name="Username"
//             value={username}
//             onChange={handleUsernameChange}
//             />
//           </div>
//           <div>
//             password
//             <input
//             type="text"
//             value={password}
//             name="Password"
//             onChange={handlePasswordChange}
//             />
//           </div>
//           <button type="submit">login</button>
//         </form>
//        </div>
//       
//       )
//    }



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
      <div>
        <h2>Create new</h2>
          <div>
          title:
          <input type="text" name="title" onChange={createBlog}></input>
          </div>
          <div>
          author:
          <input type="text" name="author"onChange={createBlog}></input>
          </div>
          <div>
          url:
          <input type="text" name="url" onChange={createBlog}></input>
          </div>
          <button type="submit" onClick={blogSubmit}>Save</button>
      </div>
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