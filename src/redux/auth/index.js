import { createSlice } from '@reduxjs/toolkit'
import { USER_TYPES } from '../../util/constants'

const initialState = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  token: localStorage.getItem('medbox-token'),
  role: USER_TYPES.PHARMACIST
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload?._id
      state.firstName = action.payload?.firstName
      state.lastName = action.payload?.lastName
      state.email = action.payload?.email
      state.token = action.payload?.token
    },
    removeUser: (state, action) => {
      state._id = ''
      state.firstName = ''
      state.lastName = ''
      state.email = ''
      state.token = ''
    }
  }
})

export const { setUser, removeUser } = authSlice.actions
export default authSlice.reducer
