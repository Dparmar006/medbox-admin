import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import storeReducer from './store/'
import medicineReducer from './medicines/'
import transactionsReducer from './transactions/'
import chatReducer from './chat/'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    store: storeReducer,
    medicines: medicineReducer,
    transactions: transactionsReducer,
    chat: chatReducer
  }
})
