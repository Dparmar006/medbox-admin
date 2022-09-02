import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import api from '../../util/api'

const initialState = {
  totalPharmacists: '',
  list: [],
  isLoading: true
}

export const getPharmacists = createAsyncThunk(
  'pharmacists/getPharmacists',
  async (values, { getState, fulfillWithValue, rejectWithValue }) => {
    const state = getState()
    if (!state.store._id) return null
    try {
      const response = await api.get('/pharmacists')
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

export const pharmacistsSlice = createSlice({
  name: 'pharmacists',
  initialState,
  reducers: {
    removePharmacists: (state, action) => {
      state.list = []
      state.totalPharmacists = 0
    }
  },
  extraReducers: builder => {
    builder.addCase(getPharmacists.fulfilled, (state, action) => {
      state.list = action.payload?.pharmacists || []
      state.totalMedicines = action.payload?.numberOfPharmacists || 0
      state.isLoading = false
    })
    builder.addCase(getPharmacists.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getPharmacists.rejected, (state, action) => {
      state.list = []
      state.numberOfPharmacists = 0
      state.isLoading = false
    })
  }
})
export const { removePharmacists } = pharmacistsSlice.actions
export default pharmacistsSlice.reducer
