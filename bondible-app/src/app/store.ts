import { configureStore } from '@reduxjs/toolkit'
import isSubmittedReducer from '../helpers/isSubmittedSlice'
import bondDataReducer from '../helpers/bondDataSlice'

export const store = configureStore({
  reducer: {
    isSubmitted: isSubmittedReducer,
    bondData: bondDataReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
