const bcrypt = require('bcrypt')
const userRouter = require("express").Router()
const User = require('../models/user')
const logger = require('../utils/logger')

userRouter.post('/', async (request, response, next) => {
    const {username, name, password} = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })
    console.log(password.length);
    if (password.length < 3) {
        return response.status(400).json({error : 'password must be at least 3 characters long'})
    }
    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        next (exception)
    }
})

userRouter.get('/', async (request, response, next) => {
    
    try {
        const users = await User 
            .find({})
            .populate('blogs', { title:1, author:1, url:1, likes:1 })

            response.json(users)
    } catch(exception) {
        next(exception)
    }
})



module.exports = userRouter