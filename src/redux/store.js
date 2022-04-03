import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import storeReducer from './store/'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    store: storeReducer
  }
})
