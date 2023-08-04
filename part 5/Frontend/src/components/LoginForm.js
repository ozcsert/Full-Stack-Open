import { useState } from 'react'

const LoginForm = ({
  createUser
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleUsernameChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logged in with', username, password)
    createUser({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }



  return (
    <div >
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
            password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" onSubmit={handleLogin}>login</button>
      </form>
    </div>
  )
}

export default LoginForm



//export default LoginForm