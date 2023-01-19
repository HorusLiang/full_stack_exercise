import { createSlice,current } from '@reduxjs/toolkit'

const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return null
    },
  }
})
export const { changeNotification,hideNotification } = notificationSlice.actions
export default notificationSlice.reducer