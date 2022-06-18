import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedblogappuser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedblogappuser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
    }
    catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      blogService.setToken(null)
      setUser(null)
      window.localStorage.clear()
    }
    catch (exception) {
      console.log(exception)
    }
  }
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      await blogService.create(newBlog)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
      setInfoMessage(`a new blog ${title} added`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
      setAuthor('')
      setTitle('')
      setUrl('')
    }
    catch (exception) {
      console.log(exception)
    }
  }
  const loginForm = () => (

    <div>
      <Notification message={errorMessage} classname='error' />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <input
            etype="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login </button>
      </form>
    </div>
  )
  const blogForm = () => (
    <div>
      <Notification message={infoMessage} classname='notification' />
      <h2>blogs</h2>
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
      <h2> create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title: <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.filter(blog => blog.user !== undefined && blog.user !== null).filter(blog => blog.user.username === user.username).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>)
  return (
    <div>

      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )


}

export default App
