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
      <div style={hideWhenVisible}>
        <div>{blog.title}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <p>{blog.url}</p>
        <div>
          {blog.likes} <button onClick={addLike}> like</button>
        </div>
        <p>{blog.author}</p>
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
    </div>
  )
}
export default Blog