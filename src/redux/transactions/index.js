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
    try {
      const response = await api.get('/transactions', {
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
  extraReducers: builder => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.list = [...action.payload.transactions]
      state.totalTransactions = action.payload.totalTransactions
    })
    builder.addCase(getTransactions.rejected, (state, action) => {
      state.list = []
      state.totaltransactions = 0
    })
  }
})

export default transactionsSlice.reducer
