const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const logger = require("../utils/logger")
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', { username:1, name:1})
    response.json(blogs)
  
})

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post("/", async (request, response, next) => {

  const body = request.body
  // blog.likes
  // ? blog.likes = blog.likes
  // : blog.likes = 0
  const token = request.token
  //verifies the token and decodes it, returning an object
  //the object includes the username and id.
  const decodedToken = jwt.verify(token , process.env.SECRET)
  
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }
console.log(decodedToken);
  const user = await User.findById(decodedToken.id)

  console.log(user);
  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes ? body.likes: 0,
    "user": {
      "id": user.id,
    "username": user.username}
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
    logger.info(`added ${blog.title} to the blog list`)
  } catch (exception) {
    next(exception)
  }

  //blog
  //  .save()
  //  .then(result => {
  //    response.status(201).json(result)
  //  })
  //  .catch(error => error.message)
})


blogsRouter.delete("/:id", async (request, response, next) => { 

  const token = request.token
  
  //verifies the token and decodes it, returning an object
  //the object includes the username and id.
  const decodedToken = jwt.verify(token , process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  try {
    const deletedBlog = await Blog.findById(request.params.id)
    if (decodedToken.id === deletedBlog.user) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
    logger.info(`${deletedBlog.title} is removed from the blog list`)
    }
    else {
      response.status(401).json({ error: 'You can only delete your own posts' })
    }
  } catch (exception) {
    next (exception)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body
  //const blogToUpdate = await Blog.findById(request.params.id)

  //if ( blogToUpdate.user._id.toString() === user._id.toString() ) {
  const blog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes ? body.likes: 0
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
    response.json(updatedBlog.toJSON())
    logger.info(`${updatedBlog.title} is succesfully updated`)
  } catch (exception) {
    next (exception)
  }
  //} else {
  //  return response.status(401).json({ error: `Unauthorized` })}
})

module.exports = blogsRouter