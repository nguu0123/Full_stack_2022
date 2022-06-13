const { MONGODB_URI, PORT } = require('../utils/config')
require('express-async-errors')
const mongoose = require('mongoose')
const { cat } = require('lodash-contrib')

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: { type: Number, default: 0 }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const mongoUrl = MONGODB_URI
const main = async () => {
    const result = await mongoose.connect(mongoUrl)
    console.log('connected to MongoDB')
}
main()
module.exports = mongoose.model('Blog', blogSchema)