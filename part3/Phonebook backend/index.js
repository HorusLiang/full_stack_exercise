const express = require('express')
const app = express()
app.use(express.json())

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

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })


// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)

//     response.status(204).end()
// })

// const generateId = () => {
//     const maxId = notes.length > 0
//       ? Math.max(...notes.map(n => n.id))
//       : 0
//     return maxId + 1
//   }
  
//   app.post('/api/notes', (request, response) => {
//     const body = request.body
  
//     if (!body.content) {
//       return response.status(400).json({ 
//         error: 'content missing' 
//       })
//     }
  
//     const note = {
//       content: body.content,
//       important: body.important || false,
//       date: new Date(),
//       id: generateId(),
//     }
  
//     notes = notes.concat(note)
  
//     response.json(note)
//   })
  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})