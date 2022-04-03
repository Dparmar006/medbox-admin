import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import storeReducer from './store/'
import medicineReducer from './medicines/'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    store: storeReducer,
    medicines: medicineReducer
  }
})
