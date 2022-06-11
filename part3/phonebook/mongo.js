const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://nguu0123:${password}@cluster0.hr7lv.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    if (process.argv[3] && process.argv[4]) {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })
      console.log(`added ${person.name} number ${person.number} to phonebook  `)
      return person.save()
    }
    else {
      console.log('Phonebook:')
      return Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
      })
    }
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))