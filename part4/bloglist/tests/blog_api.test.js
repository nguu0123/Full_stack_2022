const res = require('express/lib/response')
const { cons } = require('lodash-contrib')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'test1',
        author: 'test1 author',
        url: 'test1 url',
        likes: 2,
    },
    {
        title: 'test2',
        author: 'test2 author',
        url: 'test2 url',
        likes: 5
    },
    {
        title: 'test3',
        author: 'test3 author',
        url: 'test3 url',
        likes: 5
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})
test('there are three notes', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
})
test('valid id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined();

})

test('add 1 more blogs', async () => {
    let blogObject = new Blog({
        title: 'test4',
        author: 'test4 author',
        url: 'test4 url',
        likes: 5
    })
    await blogObject.save()
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(4)
})
test('default like to 0', async () => {
    let blogObject = new Blog({
        title: 'test4',
        author: 'test4 author',
        url: 'test4 url',
    })
    await blogObject.save()
    const response = await api.get('/api/blogs')
    expect(response.body[3].likes).toEqual(0)
})
test('able to return bad request', async () => {
    let blogObject = new Blog({
        title: 'test4',
        author: 'test4 author',

    })
    await api
        .post('/api/blogs')
        .send(blogObject)
        .expect(400)
})


