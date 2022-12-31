const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
app.use(requestLogger)



var morgan = require('morgan')
const People = require('./models/people')
morgan.token("body", function (req) {
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) // payload is also fine

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.post('/api/peoples', (request, response) => {
    const body = request.body
 
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number is missing' 
        })
    }
    const people = new People({
      name: body.name,
      number: body.number,
    })
  
    people.save().then(savedPeople => {
      response.json(savedPeople)
    })
  })



app.get('/info', (request, response) => {
    const requestTime = new Date(Date.now())
    console.log(People.count())
    People.find({})
    .then((persons) => {
        response.send(
        `<p>Phonebook has info for ${persons.length} people</p> <p>${requestTime}</p>`
      )
    })
    .catch((error) => next(error))
})

app.get('/getall', (request, response) => {
    People.find({}).then(result=>{
        result.forEach(people=>{
            console.log(people)
        })
    })
})



app.get('/api/peoples/:id', (request, response) => {
    const id = request.params.id

    People.findById(id).then((result)=>{
            if(result){
                response.json(result)
            }else{
                response.status(404).end()
            }
            
        })
    .catch((error)=>{
        console.error(error)
        response.status(400).send({error:'malformatted id'})
    })
})

app.get('/api/peoples', (request, response) => {

    People.find({}).then((result)=>{
            if(result){
                response.json(result)
            }else{
                response.status(404).end()
            }
            
        })
    .catch((error)=>{
        console.error(error)
    })
})


app.delete('/api/peoples/:id', (request, response) => {
    const id = request.params.id
    People.findByIdAndRemove(id)
     .then((deletedPerson) => {
        response.status(204).end()  
    })
    .catch((error) => {
        next(error);
    });
})



  

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)