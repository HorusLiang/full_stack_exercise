import { createSlice,current } from '@reduxjs/toolkit'

const initialState = ''
const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilterValue(state, action) {
      return action.payload
    },
  }
})
export const { changeFilterValue } = filterReducer.actions
export default filterReducer.reducer