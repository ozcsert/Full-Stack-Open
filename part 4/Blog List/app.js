
const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connection to mongo" , error.message)

  })


app.use(cors())
app.use(express.json())
app.use(express.static("build"))
app.use("/api/blogs", blogsRouter)

app.use(middleware.errorHandler)
module.exports = app