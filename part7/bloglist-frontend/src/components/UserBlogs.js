import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

const UserBlogs = () => {
  const id = useParams().id
  const userInfo = useSelector((state) => state.userInfo)
  const blogs = useSelector((state) => state.blogs)
  return userInfo !== null && blogs !== null ? (
    <div>
      <h1> {userInfo.find((user) => user.id === id).username}</h1>
      <h2> added blogs</h2>
      <ul>
        {blogs
          .filter((blog) => blog.user !== undefined && blog.user !== null)
          .filter((blog) => blog.user.id === id)
          .map((blog) => (
            <li key={blog.id}>
              {" "}
              <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
            </li>
          ))}
      </ul>
    </div>
  ) : null
}
export default UserBlogs
