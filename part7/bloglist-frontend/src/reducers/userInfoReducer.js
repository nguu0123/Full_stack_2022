import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import usersService from "../services/users"
const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: null,
  reducers: {
    setUserInfo(state, action) {
      return action.payload
    },
    increaseNumOfBlogs(state, action) {
      const username = action.payload.username
      const userToUpdate = state.find((n) => n.username === username)
      const changedUser = {
        ...userToUpdate,
        numOfBlogs: userToUpdate.numOfBlogs + 1,
      }
      return state.map((user) =>
        user.username !== username ? user : changedUser
      )
    },
    decreaseNumOfBlogs(state, action) {
      const username = action.payload.username
      const userToUpdate = state.find((n) => n.username === username)
      const changedUser = {
        ...userToUpdate,
        numOfBlogs: userToUpdate.numOfBlogs - 1,
      }
      return state.map((user) =>
        user.username !== username ? user : changedUser
      )
    },
  },
})
export const updateUserInfo = () => {
  return async (dispatch) => {
    const userInfo = await usersService.getAll()
    dispatch(
      setUserInfo(
        userInfo.map((user) => ({
          numOfBlogs: user.blogs.length,
          username: user.username,
          id: user.id,
        }))
      )
    )
  }
}
export const { setUserInfo, increaseNumOfBlogs, decreaseNumOfBlogs } =
  userInfoSlice.actions
export default userInfoSlice.reducer
