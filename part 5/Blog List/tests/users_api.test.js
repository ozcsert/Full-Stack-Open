const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require('./test_helper')
const User = require ("../models/user")
const bcrypt = require('bcrypt')

describe('When there is initially one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash("sekret", 10)
        const user = new User({
            username: "El Gato",
            passwordHash
        })

        await user.save()
    })

    test('creation succeeds with a unique username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "Lil Sniff",
            name : "Khal Doggo",
            password: "Barkinson"
        }
    
    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        
        const usernames = usersAtEnd.map(u => u.username);
        expect (usernames).toContain(newUser.username)
    })

    test("creation fails with proper status code and message if the username is already taken", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser= {
            username: "El Gato",
            password: "ServeOrDie"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

            expect(result.body.error).toContain('expected `username` to be unique')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toEqual(usersAtStart)
    })
})


//test('Users can be added', async (request, response))
