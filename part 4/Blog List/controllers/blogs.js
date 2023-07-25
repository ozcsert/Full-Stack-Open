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
  } catch (error) {
    response.status(400).json({ error : error.message })
  }

  //blog
  //  .save()
  //  .then(result => {
  //    response.status(201).json(result)
  //  })
  //  .catch(error => error.message)
})

module.exports = blogsRouter