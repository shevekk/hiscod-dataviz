import dataReducer from '../features/data'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    data: dataReducer,
  },
})
