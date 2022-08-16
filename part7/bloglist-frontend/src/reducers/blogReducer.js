import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { updateUserInfo } from "./userInfoReducer"
const initialState = []
const blogSlice = createSlice({
  name: "blogs",
  initialState: null,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const blogID = action.payload.id
      return state.filter((blog) => blog.id !== blogID)
    },
    addLike(state, action) {
      const blogID = action.payload.id
      const blogToUpdate = state.find((n) => n.id === blogID)
      const changedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      }
      return state.map((blog) => (blog.id !== blogID ? blog : changedBlog))
    },
    addComment(state, action) {
      const blog = action.payload.blogToShow
      const comment = action.payload.content
      const changedBlog = {
        ...blog,
        comments: [...blog.comments, comment],
      }
      return state.map((blog) => (blog.id !== blog.id ? blog : changedBlog))
    },
  },
})
export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(addBlog(newBlog))
  }
}
export const deleteBlog = (content) => {
  return async (dispatch) => {
    await blogService.deleteBlog(content)
    dispatch(removeBlog(content))
  }
}
export const updateLike = (content) => {
  return async (dispatch) => {
    await blogService.update(content)
    dispatch(addLike(content))
  }
}
export const { addBlog, setBlogs, removeBlog, addLike, addComment } =
  blogSlice.actions
export default blogSlice.reducer
