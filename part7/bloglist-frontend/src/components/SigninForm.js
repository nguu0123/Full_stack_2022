import Notification from "./Notification"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import userSerivce from "../services/users"
// TODO Implement show/hide password
const SigninForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      console.log("signup")
      setName("")
      setUsername("")
      setPassword("")
      const newUser = {
        username: username,
        name: name,
        password: password,
      }
      userSerivce.createUser(newUser)
      navigate("/login")
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
      <Form onSubmit={handleSignup} id="loginform">
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
          <Form.Label> name</Form.Label>
          <Form.Control
            id="name"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> password</Form.Label>
          <Form.Control
            id="password"
            value={password}
            type="password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button id="signup_button" type="submit">
          sign up{" "}
        </Button>
      </Form>
    </div>
  )
}
export default SigninForm
