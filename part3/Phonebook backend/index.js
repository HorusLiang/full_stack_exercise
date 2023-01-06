const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('build'));


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};
app.use(requestLogger);


const morgan = require('morgan');
const People = require('./models/people');
morgan.token('body', function(req) {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')); // payload is also fine


app.post('/api/peoples', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing',
    });
  }
  const people = new People({
    name: body.name,
    number: body.number,
  });


  People.find({name: people.name}).then((existingPersons) => {
    if (existingPersons.length > 0) {
      return response.status(409).json({
        error: 'Name already exists in phonebook',
      });
    }
    people.save().then((savedPeople) => {
      return response.json(savedPeople);
    }).catch((error)=>next(error));
  });
});


app.get('/info', (request, response) => {
  const requestTime = new Date(Date.now());
  console.log(People.count());
  People.find({})
      .then((persons) => {
        response.send(
            `<p>Phonebook has info for ${persons.length} people</p> 
            <p>${requestTime}</p>`,
        );
      })
      .catch((error) => next(error));
});

app.get('/getall', (request, response) => {
  People.find({}).then((result)=>{
    result.forEach((people)=>{
      console.log(people);
    });
  });
});


app.get('/api/peoples/:id', (request, response, next) => {
  const id = request.params.id;

  People.findById(id).then((result)=>{
    if (result) {
      response.json(result);
    } else {
      response.status(404).end();
    }
  })
      .catch((error)=>{
        next(error);
      });
});

app.get('/api/peoples', (request, response, next) => {
  People.find({}).then((result)=>{
    if (result) {
      response.json(result);
    } else {
      response.status(404).end();
    }
  })
      .catch((error)=>{
        next(error);
      });
});


app.delete('/api/peoples/:id', (request, response, next) => {
  const id = request.params.id;
  People.findByIdAndRemove(id)
      .then((deletedPerson) => {
        response.status(204).end();
      })
      .catch((error) => {
        next(error);
      });
});

app.put('/api/peoples/:id', (request, response, next) => {
  const body = request.body;

  const people = {
    name: body.name,
    number: body.number,
  };

  People.findByIdAndUpdate(request.params.id, people, {new: true, runValidators: true, context: 'query'}) // if true, return the modified document rather than the original
      .then((updatedPeople) => {
        response.json(updatedPeople);
      })
      .catch((error) => next(error));
});


const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'});
};

app.use(unknownEndpoint);


const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message});
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// By defining the port at the bottom of the file
// we ensure that all the necessary routes and middleware have been set up
// before the server starts listening for requests.
