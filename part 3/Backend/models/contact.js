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
const contactSchema = new mongoose.Schema({
    name: String,
    number: String
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
