import Notification from "./Notification"
import Togglable from "./Togglable"
import CreateBlogForm from "./CreateBlogForm"
import { useDispatch, useSelector } from "react-redux"
import Blog from "./Blog"
import blogService from "../services/blogs"
import { createBlog, updateLike, deleteBlog } from "../reducers/blogReducer"
import { setUser } from "../reducers/userReducer"
import { useRef } from "react"
import { Link } from "react-router-dom"
import {
  decreaseNumOfBlogs,
  increaseNumOfBlogs,
} from "../reducers/userInfoReducer"
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
  const updateBlogLikes = async (newBlog) => {
    dispatch(updateLike(newBlog))
  }
  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      dispatch(decreaseNumOfBlogs())
    }
  }
  return (
    <div>
      <Notification message={notification} classname="notification" />
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2> create new</h2>
        <CreateBlogForm createBlog={handleCreateBlog} />
      </Togglable>
      {blogs === null
        ? "No Data"
        : blogs
            .filter((blog) => blog.user !== undefined && blog.user !== null)
            .filter((blog) => blog.user._id === user._id)
            .sort((a, b) => {
              return -(a.likes - b.likes)
            })
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlogLikes}
                deleteBlog={handleDeleteBlog}
              />
            ))}
    </div>
  )
}
export default Blogs
