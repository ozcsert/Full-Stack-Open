const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const logger = require("../utils/logger")

blogsRouter.get("/", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
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

  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes ? body.likes: 0
  })

  try {
    const savedBlog = await blog.save()
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

  try {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    logger.info(`${deletedBlog.title} is removed from the blog list`)
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