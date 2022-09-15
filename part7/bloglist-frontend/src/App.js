import { useEffect, useState } from "react"
import blogService from "./services/blogs"
import "./App.css"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlog } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"
import LoginForm from "./components/LoginForm"
import Blog from "./components/Blog"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom"
import UsersInfo from "./components/UsersInfo"
import { setUserInfo, updateUserInfo } from "./reducers/userInfoReducer"
import UserBlogs from "./components/UserBlogs"
import Blogs from "./components/Blogs"
import SigninForm from "./components/SigninForm"
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedblogappuser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatch(initializeBlog())
      dispatch(updateUserInfo())
    }
  }, [])
  const padding = {
    padding: 5,
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      blogService.setToken(null)
      dispatch(setUser(null))
      window.localStorage.clear()
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <div className="container">
      <Router>
        <div>
          <Link style={padding} to="/">
            blogs
          </Link>
          {user ? (
            <span>
              <Link style={padding} to="/users">
                users
              </Link>
              <em>{user.username} logged in</em>
              {"   "}
              <button onClick={handleLogout}>logout</button>
            </span>
          ) : (
            <Link style={padding} to="/login">
              login
            </Link>
          )}
        </div>
        <Routes>
          <Route
            path="/users"
            element={
              user !== null ? (
                <div>
                  <UsersInfo />
                </div>
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/users/:id" element={<UserBlogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route
            path="/login"
            element={
              user === null ? <LoginForm /> : <Navigate replace to="/users" />
            }
          />
          <Route path="/" element={<Blogs />} />
          <Route path="/signup" element={<SigninForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
