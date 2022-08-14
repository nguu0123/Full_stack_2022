import { createSlice } from "@reduxjs/toolkit"
const initialState = null
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    changeNotification(state, action) {
      const newNoti = action.payload
      return newNoti
    },
    removeNotification(state, action) {
      return null
    },
  },
})
export const { changeNotification, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
