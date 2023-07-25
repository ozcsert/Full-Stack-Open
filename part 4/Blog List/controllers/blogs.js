const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body)
  console.log(blog.likes);
  //if (blog.likes === u)
  blog.likes 
  ? blog.likes = blog.likes
  : blog.likes = 0

  console.log(blog.likes);

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => error.message)
})

module.exports = blogsRouter