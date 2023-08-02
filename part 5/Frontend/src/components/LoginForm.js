
const LoginForm = ({
handlePasswordChange,
handleUsernameChange,
username,
password,
handleSubmit
}) => {

    return (
        <div>
            <h1>Login</h1>

          <form onSubmit={handleSubmit}>
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
           <button type="submit">login</button>
         </form>
        </div>

       )
    }


   
   export default LoginForm



//export default LoginForm