import { Alert } from "react-bootstrap"
const Notification = ({ message, classname }) => {
  if (message === null) return null
  else return <Alert variant={classname}>{message}</Alert>
}
export default Notification
