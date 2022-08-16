import Notification from "./Notification"
import Togglable from "./Togglable"
import CreateBlogForm from "./CreateBlogForm"
import { useDispatch, useSelector } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { useRef } from "react"
import { Link } from "react-router-dom"
import { increaseNumOfBlogs } from "../reducers/userInfoReducer"
const Blogs = () => {
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const handleCreateBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      blogFormRef.current.toggleVisibility()
      dispatch(increaseNumOfBlogs(user))
    } catch (exception) {
      console.log(exception)
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div>
      <Notification message={notification} classname="success" />
      <h2>blogs</h2>

      {blogs === null || user === null ? (
        "No Data"
      ) : (
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2> create new</h2>
            <CreateBlogForm createBlog={handleCreateBlog} />
          </Togglable>
          {blogs
            .filter((blog) => blog.user !== undefined && blog.user !== null)
            .filter((blog) => blog.user._id === user._id)
            .sort((a, b) => {
              return -(a.likes - b.likes)
            })
            .map((blog) => (
              <li key={blog.id} style={blogStyle}>
                {" "}
                <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
              </li>
            ))}
        </div>
      )}
    </div>
  )
}
export default Blogs
