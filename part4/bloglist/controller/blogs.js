const blogsRouter = require('express').Router()
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
blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    catch (error) {
        response.status(404).end()
    }
})
blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true, runValidators: true, context: 'query' })
        response.json(updatedBlog)
    }
    catch (error) {
        response.status(404).end()
    }
})
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


module.exports = blogsRouter