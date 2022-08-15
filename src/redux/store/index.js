import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: '',
  name: '',
  address: {
    city: '',
    addressLine1: '',
    addressLine2: '',
    landmark: ''
  },
  ...JSON.parse(localStorage.getItem('medbox-store'))
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStore: (state, action) => {
      state._id = action?.payload?._id
      state.name = action?.payload?.name
      state.address = { ...action?.payload?.address }
    },
    removeStore: (state, action) => {
      state._id = ''
      state.name = ''
      state.address = {
        city: '',
        addressLine1: '',
        addressLine2: '',
        landmark: ''
      }
    }
  }
})

export const { setStore, removeStore } = storeSlice.actions
export default storeSlice.reducer
