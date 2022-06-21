import { useState } from "react"

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(true)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)
  const addLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(newBlog)
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility} style={showWhenVisible}>view</button>
        <button onClick={toggleVisibility} style={hideWhenVisible}>hide</button>
      </div>
      <div style={hideWhenVisible}>
        <p> {blog.url}</p>
        <div>
          {blog.likes} <button onClick={addLike}> like</button>
        </div>
        <p> {blog.author}</p>
      </div>
    </div>
  )
}
export default Blog