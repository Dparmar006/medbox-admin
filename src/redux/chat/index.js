import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import api from '../../util/api'

const initialState = {
  socket: null,
  chats: {}
}

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload
    },
    setMessage: (state, action) => {
      if (state.chats[action.payload.author]) {
        let arr = state.chats[action.payload.author]
        arr.push(action.payload)
      } else {
        state.chats[action.payload.author] = [action.payload]
      }
    }
  }
})
export const { setSocket, setMessage } = chatSlice.actions
export default chatSlice.reducer
