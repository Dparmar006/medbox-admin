import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import api from '../../util/api'

const initialState = {
  totalMedicines: '',
  list: []
}

export const getMedicines = createAsyncThunk(
  'medicines/getMedicines',
  async (values, { getState, fulfillWithValue, rejectWithValue }) => {
    const state = getState()
    if (!state.store.id) return null
    try {
      const response = await api.get('/medicines', { storeId: state.store.id })
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

export const medicinesSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: {
    removeMedicines: (state, action) => {
      state.list = []
      state.totalMedicines = 0
    }
  },
  extraReducers: builder => {
    builder.addCase(getMedicines.fulfilled, (state, action) => {
      state.list = action.payload?.medicines || []
      state.totalMedicines = action.payload?.totalMedicines || 0
    })
    builder.addCase(getMedicines.rejected, (state, action) => {
      state.list = []
      state.totalMedicines = 0
    })
  }
})
export const { removeMedicines } = medicinesSlice.actions
export default medicinesSlice.reducer
