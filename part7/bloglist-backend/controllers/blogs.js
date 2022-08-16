const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const res = require("express/lib/response")
const { userExtractor } = require("../utils/middleware")
const { cons } = require("lodash-contrib")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate({
    path: "user",
    select: ["username", "name"],
  })
  response.json(blogs)
})

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body
  const user = request.body.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })
  try {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  } catch (error) {
    response.status(400).json({ error: "foudn it" })
  }
})
blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  try {
    const body = request.body
    const user = request.body.user
    const blog = await Blog.findById(request.params.id)
    if (blog && blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(404).end()
  }
})
blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: "query" }
    )
    response.json(updatedBlog)
  } catch (error) {
    response.status(404).end()
  }
})
blogsRouter.post("/:id/comments", async (request, response) => {
  const { comment } = request.body
  console.log(request.body)
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $push: { comments: [comment] } },
      { new: true }
    )
    response.json(updatedBlog)
  } catch (error) {
    response.status(404).end()
  }
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}
module.exports = blogsRouter
