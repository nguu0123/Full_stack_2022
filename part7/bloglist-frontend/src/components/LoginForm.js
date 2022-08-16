import Notification from "./Notification"
import { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
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
      <Notification message={errorMessage} classname="error" />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} id="loginform">
        <div>
          username {"   "}
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password {"   "}
          <input
            id="password"
            type={!showPassword ? "password" : "text"}
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login_button" type="submit">
          login{" "}
        </button>
      </form>
    </div>
  )
}
export default LoginForm
