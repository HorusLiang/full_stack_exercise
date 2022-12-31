const express = require('express')
const app = express()
app.use(express.json())
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
app.use(requestLogger)


var morgan = require('morgan')
app.use(morgan('combined'))

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


let notes = 
[
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

app.get('/api/peoples', (request, response) => {
    response.json(notes)
})

app.get('/info', (request, response) => {
    const date=new Date()
    const requestTime = new Date(Date.now())
      response.send(`<p>Phonebook has info for ${notes.length} people. </p> <p> ${requestTime}.</p> `);
})





app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})


const generateId = () => {
    return Math.floor(Math.random() * 10000)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number is missing' 
      })
    }
    const isExistName= notes.find(note => note.name === body.name)
    if (isExistName) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      }
    const note = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    notes = notes.concat(note)
    response.json(note)
  })
  



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })


// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)

//     response.status(204).end()
// })