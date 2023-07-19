//const blog = require("../models/blog")


const totalLikes = (blogPosts) => {
    return blogPosts.length === 0
    ? 0
    : blogPosts.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = { totalLikes }





