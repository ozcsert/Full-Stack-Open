const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url=process.env.MONGODB_URI

console.log('connecting to', url);

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    })

//number is stored as a string because
//dash is problematic to store as an integer

//custom validator set
const validator = (val) => val.charAt(2) === "-" 
|| val.charAt(3) === "-"

const custom = [validator, 'Uh oh, the number is not formatted correctly(Valid: 00-0... or 000-0...).']

const contactSchema = new mongoose.Schema({
    name: {
    type : String,
    minLength : 3,
    required : true
},
    number: {
        type : String,
        minLength : 8,
        validate: custom
    }
})

//transforms the _id property to a string. It was an object.
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  

module.exports = mongoose.model('Contact', contactSchema)
