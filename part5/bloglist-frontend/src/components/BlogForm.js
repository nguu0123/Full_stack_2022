import { useState } from 'react'
const BlogForm = ({ createBlog, setInfoMessage }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        createBlog(newBlog)
        setInfoMessage(`a new blog ${title} added`)
        setTimeout(() => {
            setInfoMessage(null)
        }, 5000)
        setAuthor('')
        setTitle('')
        setUrl('')
    }
    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    title: <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>

        </div>)
}
export default BlogForm