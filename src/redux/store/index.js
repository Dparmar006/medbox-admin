import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  address: {
    city: '',
    addressLine1: '',
    addressLine2: '',
    landmark: ''
  }
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.id = action.payload._id
      state.name = action.payload.name
      state.address = { ...action.payload.address }
    }
  }
})

export const { setStore } = storeSlice.actions
export default storeSlice.reducer
