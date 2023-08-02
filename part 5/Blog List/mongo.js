
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const password = process.argv[2]

const url =
`mongodb+srv://ozcsert1:${password}@cluster25021994.musbupe.mongodb.net/BlogListApp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

//number is stored as a string because
//dash is problematic to store as an integer

const argv = process.argv

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
  const Contact = new mongoose.model('Contact', contactSchema)
  


//prints the data of the target db
//run node mongo ${password}
const info = () => {
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
  
    mongoose.connection.close()
  }
  )
  Blog.deleteMany({})
}

//saves new data to the target db
//run node mongo ${"name"} ${number}
const add = () => {
  contactcreate(argv[3],argv[4]).save().then(result => {
    console.log(`added ${argv[3]} number ${argv[4]} to phonebook`)
    mongoose.connection.close()
  })}

if (argv.length === 3 && argv[2] === password) {
  return info()
} else {
  return add()
}


