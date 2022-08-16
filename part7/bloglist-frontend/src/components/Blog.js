import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { updateLike, deleteBlog, addComment } from "../reducers/blogReducer"
import { decreaseNumOfBlogs } from "../reducers/userInfoReducer"
import blogService from "../services/blogs"
const Blog = () => {
  const blogID = useParams().id
  const blogToShow = useSelector((state) =>
    state.blogs === null ? null : state.blogs.find((blog) => blog.id === blogID)
  )
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      dispatch(decreaseNumOfBlogs())
    }
  }
  const addLike = () => {
    const newBlog = { ...blogToShow, likes: blogToShow.likes + 1 }
    dispatch(updateLike(newBlog))
  }
  const handleAddComment = async (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ""
    await blogService.addComment({ blog: blogToShow, comment: content })
    dispatch(addComment({ blogToShow, content }))
  }
  return blogToShow === null ? null : (
    <div className="blog" style={blogStyle}>
      <h1> {blogToShow.title}</h1>
      <p> {blogToShow.url}</p>
      <div>
        {blogToShow.likes}{" "}
        <button onClick={addLike} className="like_button">
          {" "}
          like
        </button>
      </div>
      <p> {blogToShow.author}</p>
      <div>
        <h2> comments</h2>
        <form onSubmit={handleAddComment}>
          <input type="text" name="comment" /> <button> add comment</button>
        </form>
        <ul>
          {blogToShow.comments.map((comment) => (
            <li key={Math.random(1000)}> {comment} </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Blog
