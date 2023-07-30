const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password} = request.body 

    const user = await User.findOne({username})

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "invalid username or password"
        }) 
    } 
    const tokenForUser = {
        username : user.username,
        id: user._id
    }
    //this token will be sent from the browser to the server.
    //by using auth header.
    const token = jwt.sign(tokenForUser, process.env.SECRET, { expiresIn: 60*60 })

    response.status(200)
    .send({ token, username: user.username, name: user.name })

})



module.exports = loginRouter