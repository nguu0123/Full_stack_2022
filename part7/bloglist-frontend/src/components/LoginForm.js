import Notification from "./Notification"
import { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { initializeBlog } from "../reducers/blogReducer"
import { updateUserInfo } from "../reducers/userInfoReducer"
import { Form, Button } from "react-bootstrap"
// TODO Implement show/hide password
const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedblogappuser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(initializeBlog())
      dispatch(updateUserInfo())
      navigate("/users")
      setPassword("")
      setUsername("")
    } catch (exception) {
      setErrorMessage("Wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <Notification message={errorMessage} classname="danger" />
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin} id="loginform">
        <Form.Group>
          <Form.Label> username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> password</Form.Label>
          <Form.Control
            id="password"
            type={!showPassword ? "password" : "text"}
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button id="login_button" type="submit">
          login{" "}
        </Button>
      </Form>
    </div>
  )
}
export default LoginForm
