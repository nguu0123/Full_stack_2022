const { MONGODB_URI, PORT } = require('./utils/config')
const http = require('http')
const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const userRouter = require('./controller/users')
const blogRouter = require('./controller/blogs')
mongoose.connect(MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
module.exports = app