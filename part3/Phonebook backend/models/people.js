const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
    .then((result) => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });

const isValidPhoneNumber = (value) => {
  // Check if the value has length of 8 or more
  if (value.length < 8) {
    return false;
  }

  // Check if the value is formed of two parts separated by -
  const parts = value.split('-');
  if (parts.length !== 2) {
    return false;
  }

  // Check if the first part has two or three numbers
  if (parts[0].length < 2 || parts[0].length > 3) {
    return false;
  }

  // Check if the second part consists of numbers
  if (!/^\d+$/.test(parts[1])) {
    return false;
  }

  return true;
};


const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: [isValidPhoneNumber, 'Invalid phone number'],
  },
});
peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('People', peopleSchema);
