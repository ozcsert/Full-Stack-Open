
const http = require('http')
const express = require('express');
const { log } = require('console');
const app = express()
const morgan = require('morgan')
const PORT = 3002
app.listen(PORT)
console.log(`Running on ${PORT}`);

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

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

const generateId = () => {
    const Id = Math.floor(Math.random() * 9999999999)
    return Id
}

  app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id ===id) 
    if (person) {
        response.json(person)
    } response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    if (!body.name || !body.number) {
        return response.status(404).json({
            error: "name or number missing"
        })
    } else if (persons.find(p => p.name === body.name)) {
        return response.status(404).json({
            error: "name already exists."
        })} else 
    persons = persons.concat(person)
    response.json(person)
})

const info = 
`<h1>Phonebook has info for ${persons.length}  people </h1>
<p>${new Date()}</p>`

app.get('/api/info', (request, response) => {
    response.send(info)
})

