const { MONGODB_URI, PORT } = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controller/blogs')
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})