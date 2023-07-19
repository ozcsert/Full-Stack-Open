require("dotenv").config()
const config = require('./utils/config')


const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const { MONGODB_URI } = require("./utils/config")

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})


const Blog = mongoose.model("Blog", blogSchema)

const blog = new Blog(
  {
    title: "test",
    author: "test",
    url: "test",
    likes: 3
  }
)

blog.save().then (result => {
  console.log("saved")})


mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())

app.get("/api/blogs", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})






