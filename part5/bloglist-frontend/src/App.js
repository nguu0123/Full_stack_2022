import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const blogFormRef = useRef()

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
  const handleCreateBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
      blogFormRef.current.toggleVisibility()
    }
    catch (exception) {
      console.log(exception)
    }
  }
  const updateBlogLikes = async (newBlog) => {
    await blogService.update(newBlog)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)

  }
  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    }

  }

  const loginForm = () => (

    <div>
      <Notification message={errorMessage} classname='error' />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} id='loginform'>
        <div>
          username <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login_button" type="submit">login </button>
      </form>
    </div>
  )
  const blogForm = () => (
    <div>
      <Notification message={infoMessage} classname='notification' />
      <h2>blogs</h2>
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2> create new</h2>
        <BlogForm createBlog={handleCreateBlog} setInfoMessage={setInfoMessage} />
      </Togglable>
      {blogs.filter(blog => blog.user !== undefined && blog.user !== null).filter(blog => blog.user.username === user.username).sort((a, b) => {
        return -(a.likes - b.likes);
      }).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlogLikes} deleteBlog={deleteBlog} />
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
