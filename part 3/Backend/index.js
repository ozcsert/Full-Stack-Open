const mongoose = require('mongoose')

//imports .env
require('dotenv').config()

const http = require('http')
const express = require('express');
const { log } = require('console');
const app = express()
const morgan = require('morgan')
const cors = require('cors')

//imports the mongoose module
const Contact = require('./models/contact');
const contact = require('./models/contact');
app.use(cors())

app.use(express.static('build'))

morgan.token('id', function getId(req) {
    return req.id
})

morgan.token('post-data', (req) => {
    return JSON.stringify(req.body)
})

//creates and 
const assignId = (req, res, next) => {
     req.id = generateId()
     next()}
//assignsID to the request itself
app.use(assignId)

app.use(morgan(':id :method :url :response-time :post-data'))

app.use(express.json())


const generateId = () => {
    const Id = Math.floor(Math.random() * 9999999999)
    return Id
}

  app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
    response.json(contacts)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
        response.json(contact)
    })
//    const id = Number(request.params.id)
//    const person = persons.find(p => p.id ===id) 
    //if (person) {
    //    response.json(person)
    //} response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body);
        if (body.name === undefined) {
            return response.status(404).json({
                error: "content missing"
            })
        }

        const contact = new Contact ({
            name: body.name,
            number: body.number 
        })
        
        contact.save().then(savedContact =>
            response.json(savedContact))
})

//const info = 
//`<h1>Phonebook has info for ${persons.length}  people </h1>
//<p>${new Date()}</p>`

app.get('/api/info', (request, response) => {
    response.send(info)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
