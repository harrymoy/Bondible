import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
export interface isSubmittedState {
  value: boolean
}

// Define the initial state using that type
const initialState: isSubmittedState = {
  value: false
}

export const isSubmittedSlice = createSlice({
  name: 'isSubmitted',
  initialState,
  reducers: {
    setTrue: (state) => {
      state.value = true
    },
    setFalse: (state) => {
      state.value = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { setTrue, setFalse } = isSubmittedSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsSubmitted = (state: RootState) => state.isSubmitted.value

export default isSubmittedSlice.reducer