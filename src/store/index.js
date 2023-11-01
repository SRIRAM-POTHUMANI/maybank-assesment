// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import googleMapReducer from './apps/googleMapReducer'


export const store = configureStore({
  reducer: {
    googleMapReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
