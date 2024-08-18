import { configureStore } from '@reduxjs/toolkit'
import ApiSlice from '../ApiSlice/ApiSlice'
import SimpleSlice from '../SimpleSlice/SimpleSlice'

export const store = configureStore({
  reducer: {
    apiSlice:ApiSlice,
    simpleSlice:SimpleSlice
  },
})