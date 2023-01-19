import { createSlice,current } from '@reduxjs/toolkit'

const initialState = 'render here notification'
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
  }
})
export const { createAnecdote,vote } = notificationSlice.actions
export default notificationSlice.reducer