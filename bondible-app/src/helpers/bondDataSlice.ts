import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
export interface bondDataState {
  amount: number;
  rate: number;
  company: string;
  description: string;
}

// Define the initial state using that type
const initialState: bondDataState = {
  amount: 0,
  rate: 0,
  company: "",
  description: ""
}

export const bondDataSlice = createSlice({
  name: 'bondData',
  initialState,
  reducers: {
    setBondData: (state, action) => {
      state.amount = action.payload.amount
      state.company = action.payload.company
      state.description = action.payload.description
      state.rate = action.payload.rate
    }
  }
})

// Action creators are generated for each case reducer function
export const { setBondData } = bondDataSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getBondData = (state: RootState) => state.bondData

export default bondDataSlice.reducer