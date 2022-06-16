const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/helper')
const User = require('../models/user')

//...

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
        const passwordHash1 = await bcrypt.hash('nguu0123456', 10)
        const user1 = new User({ username: 'nguu0123', passwordHash: passwordHash1 })

        await user1.save()

    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('invalid users are note created', async () => {

        const newUser = {
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('must give username and password')

        const newUser1 = {
            username: "asdfasdfasdf",
            name: 'Superuser',
        }

        const result1 = await api
            .post('/api/users')
            .send(newUser1)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result1.body.error).toContain('must give username and password')

        const newUser2 = {
            username: "a",
            name: 'Superuser',
            password: 'asd123123dsfas'
        }

        const result2 = await api
            .post('/api/users')
            .send(newUser2)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result2.body.error).toContain('username length must be at least 3')

        const newUser3 = {
            username: "a123123213123asdfs",
            name: 'Superuser',
            password: '21'
        }

        const result3 = await api
            .post('/api/users')
            .send(newUser3)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result3.body.error).toContain('password length must be at least 3')
    })
    test('create blog without token fail', async () => {
        await api
            .post('/api/users')
            .send(newUser3)
            .expect(400)


    })
})