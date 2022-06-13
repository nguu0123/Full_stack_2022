const blogsRouter = require('express').Router()
const res = require('express/lib/response')
const { result } = require('lodash')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    try {
        const result = await blog.save()
        response.status(201).json(result)
    }
    catch (error) {
        console.log(1)
        response.status(400).json({ error: "foudn it" })
    }
})

module.exports = blogsRouter