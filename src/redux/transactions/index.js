import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import api from '../../util/api'

const initialState = {
  totalTransactions: 0,
  list: [],
  isLoading: false,
}

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (values, { getState, fulfillWithValue, rejectWithValue }) => {
    const state = getState()
    if (!state.store._id) return rejectWithValue(null)
    try {
      const response = await api.get('/transactions', {
        storeId: state.store._id
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
    builder.addCase(getTransactions.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.list = action.payload?.transactions || []
      state.totalTransactions = action.payload?.totalTransactions || 0
      state.isLoading = false
    })
    builder.addCase(getTransactions.rejected, (state, action) => {
      state.totalTransactions = 0
      state.list = []
      state.isLoading = false
    })
  }
})
export const { removeTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer
