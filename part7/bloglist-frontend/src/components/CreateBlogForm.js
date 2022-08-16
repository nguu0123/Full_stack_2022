import { useState } from "react"
import {
  changeNotification,
  removeNotification,
} from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { Form } from "react-bootstrap"
const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const dispatch = useDispatch()
  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    createBlog(newBlog)
    dispatch(changeNotification(`a new blog ${title} added`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    setAuthor("")
    setTitle("")
    setUrl("")
  }
  return (
    <div>
      <Form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            id="title_input"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author_input"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url_input"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create_blog_button" type="submit">
          create
        </button>
      </Form>
    </div>
  )
}
export default CreateBlogForm
