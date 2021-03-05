import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/boardSlice'

export default configureStore({
  reducer: {
    board: boardReducer
  }
})