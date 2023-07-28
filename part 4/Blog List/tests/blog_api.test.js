const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const config = require("../utils/config")
const blog = require ("../models/blog")


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to mongo" , error.message)
  })

describe("Blog Info", () => {
  test("can fetch the posts from db", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
  })

  test("number of blogs posts in db is 2", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body.length).toBe(2)
  })

  test("the content type of posts in db is json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("the unique identifier to be named: id", async () => {
    const response = await api.get("/api/blogs")
    response.body.forEach(b => {
      expect(b.id).toBeDefined()
    })
  })
})
describe("Blog Posting", () => {
  test("that validates new posts are created", async () => {
    const firstResponse = await api.get("/api/blogs")

    const newBlog= {
      title: "added",
      author: "added",
      url: "added",
      likes: 3,
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const secondResponse = await api.get("/api/blogs")
    await expect(secondResponse.body).toHaveLength(firstResponse.body.length + 1)
    await blog.deleteOne()
  })

  test("likes property defaults to 0, given it is undefined", async () => {
    const newBlog= {
      title: "added",
      author: "added",
      url:"added",
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const request = await api.get("/api/blogs")
    const lastAddedObject = request.body[request.body.length - 1]

    await expect(lastAddedObject.likes).toBe(0)
    await blog.deleteOne()

  })
  test("defaullt to 404, if the url property is missing", async () => {
    const newBlog= {
      title: "added",
      author: "added",
      likes: 3
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
    //const request = await api.get('/api/blogs')
    //const lastAddedObject = request.body[request.body.length - 1]
      .expect(400)
  })

  test("default to 404, if the title property is missing", async () => {
    const newBlog= {
      url: "added",
      author: "added",
      likes: 3
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
    //const request = await api.get('/api/blogs')
    //const lastAddedObject = request.body[request.body.length - 1]
      .expect(400)
  })
})
describe("Blog Updating",  () => {
  test("likes property can be updated", async () => {
    const response = await api.get("/api/blogs")
    const blogToBeUpdated = response.body[0]

    const updateBlogTo= {
      ...blogToBeUpdated,
      likes: 8
    }
    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(updateBlogTo)
      .expect(200)
      .expect("Content-Type", /application\/json/)
    const updatedBlogs = await api.get("/api/blogs")
    expect(updatedBlogs.body[0].likes).toBe(updateBlogTo.likes)
  })
})

describe("Blog Deletion",  () => {
  test("blog can be deleted", async () => {
    const blogsAtTheStart = await blog.find({})
    const firstResponse = await blogsAtTheStart.map(blog1 => blog1.toJSON())

    const blogToDelete = firstResponse[1]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const secondResponse = await blog.find({})
    await expect(secondResponse).toHaveLength(firstResponse.length - 1)

    //adds the deleted post again.
    const newBlog= {
      title: "added",
      author: "added",
      url: "added",
      likes: 0,
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

