const { response } = require('express')
const express = require('express')
const res = require('express/lib/response')
const morgan = require('morgan')

const app = express()
app.use(express.json())
morgan.token('person', function (req) {
    return JSON.stringify(req.body);
})
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.person(req)
    ].join(' ')
}))
let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})
app.get('/info', (request, response) => {
    response.send(`
    <p> Phonebook has info of ${persons.length} people </p>
    <p> ${new Date()}</p>
    `)
}
)
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
    console.log(persons)
})
app.post('/api/persons', (request, response) => {
    const person = request.body
    if (!persons.map(person => person.name).includes(person.name) && person.name && person.number) {
        person.id = Math.floor(Math.random() * 10000)
        persons = persons.concat(person)
        response.json(person)
    }
    else {

        if (persons.map(person => person.name).includes(person.name))
            response.status(400).json({ error: 'name must be unique' })
        else if (!person.name)
            response.status(400).json({ error: 'no name' })
        else
            response.status(400).json({ error: 'no number' })
    }
})
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})