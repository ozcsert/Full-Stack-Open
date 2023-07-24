const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const config = require("../utils/config")

mongoose.connect(config.MONGODB_URI)
.then(() => {
  console.log("connected to MongoDB")
})
.catch((error) => {
  console.log("error connection to mongo" , error.message); 
})


test('the number of blog posts in db', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the unique identifier to be named: id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(b => {
        expect(b.id).toBeDefined()
    })
})

test('that validates new posts are created', async () => {    
    const firstResponse = await api.get('/api/blogs')

    const newBlog= { 
        title: "added",
        author: "added",
        url: "added",
        likes: 3,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const secondResponse = await api.get('/api/blogs')
        expect(secondResponse.body).toHaveLength(firstResponse.body.length + 1)

})


afterAll(async () => {
    await mongoose.connection.close()
  })


