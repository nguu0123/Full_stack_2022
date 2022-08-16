import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const UsersInfo = () => {
  const users = useSelector((state) => state.userInfo)
  const tableStyle = {
    textAlign: "left",
    fontWeight: "normal",
  }
  return (
    <div>
      <h1> Users</h1>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>blogs created</th>
          </tr>

          {users.map((user) => (
            <tr key={user.id}>
              <th style={tableStyle}>
                <Link to={`/users/${user.id}`}> {user.username}</Link>
              </th>
              <th style={tableStyle}> {user.numOfBlogs} </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default UsersInfo
