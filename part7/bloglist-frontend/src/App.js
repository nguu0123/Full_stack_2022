import { useEffect, useState } from "react"
import blogService from "./services/blogs"
import "./App.css"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlog } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom"
import Home from "./components/Home"
import UsersInfo from "./components/UsersInfo"
import usersService from "./services/users"
import { setUserInfo, updateUserInfo } from "./reducers/userInfoReducer"
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(initializeBlog())
    dispatch(updateUserInfo())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedblogappuser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
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
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        {user ? (
          <span>
            <Link style={padding} to="/users">
              blogs
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
        <Route
          path="/login"
          element={
            user === null ? <LoginForm /> : <Navigate replace to="/users" />
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
