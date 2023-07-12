console.log("hello");

const http = require('http')
const express = require('express');
const { log } = require('console');
const app = express()
const PORT = 3002
app.listen(PORT)
console.log(`Running on ${PORT}`);
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
    const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
    return maxId + 1 
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
    console.log(request.body);
})


app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(404).json({
            error: "name missing"
        })
    }
    
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    console.log(body);
    response.json(person)
})