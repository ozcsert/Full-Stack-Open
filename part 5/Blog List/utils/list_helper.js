//const blog = require("../models/blog")


const totalLikes = (blogPosts) => {
  return blogPosts.length === 0
    ? 0
    : blogPosts.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogPosts) => {
  return blogPosts.length === 0
    ? {}
    : blogPosts.reduce((a , b) => {
      return a.likes > b.likes ? a : b
    })
}

module.exports = { totalLikes, favoriteBlog }







