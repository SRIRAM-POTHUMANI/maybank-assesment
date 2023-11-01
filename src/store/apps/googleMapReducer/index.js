import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


export const getMapData = createAsyncThunk('getMapData', async (text, { getState, dispatch }) => {
  const response = await axios.get(`http://192.168.0.113:3001/searchPlaces?input=${text ? text : 'hyd'}`)
  return response.data
})

export const getPlaceByPlaceId = createAsyncThunk('getPlaceByPlaceId', async (placeId, { getState, dispatch }) => {
  const response = await axios.get(`http://192.168.0.113:3001/getPlaceByPlaceId?placeid=${placeId}`)
  return response.data
})

export const googleMapSlice = createSlice({
  name: 'googleMap',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMapData.fulfilled, (state, action) => {
      state.places = action.payload.predictions
    })
    builder.addCase(getPlaceByPlaceId.fulfilled, (state, action) => {
      state.selectedPlace = action.payload.result
    })
  }
})

export default googleMapSlice.reducer
