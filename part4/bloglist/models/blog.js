const { MONGODB_URI, PORT } = require('../utils/config')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})


const mongoUrl = MONGODB_URI
mongoose.connect(mongoUrl)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
module.exports = mongoose.model('Blog', blogSchema)