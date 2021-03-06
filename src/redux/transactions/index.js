import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import api from '../../util/api'

const initialState = {
  totalTransactions: 0,
  list: []
}

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (values, { getState, fulfillWithValue, rejectWithValue }) => {
    const state = getState()
    if (!state.store.id) return null
    try {
      const response = await api.post('/transactions', {
        storeId: state.store.id
      })
      if (response.status === 200) {
        return fulfillWithValue(response.data)
      }
      return rejectWithValue(JSON.parse(response.data))
    } catch (err) {
      message.error(err.response.data.message)
      return rejectWithValue(JSON.parse(err))
    }
  }
)

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    removeTransactions: (state, action) => {
      state.totalTransactions = 0
      state.list = []
    }
  },
  extraReducers: builder => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.list = action.payload?.transactions || []
      state.totalTransactions = action.payload?.totalTransactions || 0
    })
    builder.addCase(getTransactions.rejected, (state, action) => {
      state.totaltransactions = 0
      state.list = []
    })
  }
})
export const { removeTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer
