
const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }
const password = process.argv[2]

const url = `mongodb+srv://horusliang:${password}@cluster0.fvncjns.mongodb.net/noteAppTry?retryWrites=true&w=majority`


const peopleSchema = new mongoose.Schema({
  name: String,
  number:String,
})



const People = mongoose.model('People', peopleSchema) 
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const note = new People({
      name: process.argv[3],
      number: process.argv[4]
    })
    return note.save()
  })
  .then(() => {
    console.log('added ',process.argv[3]," ", process.argv[4]," to phonebook")
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))


// mongoose
//   .connect(url)
//   .then((result) => {
//     console.log('connected')

//     Note.find({}).then(result => {
//       result.forEach(note => {
//         console.log(note)
//       })
//       mongoose.connection.close()
//     })
//   })
//   .catch((err) => console.log(err))