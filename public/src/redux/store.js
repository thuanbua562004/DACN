import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counterSlice'
import postsReducer from './slice/sliceApi';

export default configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
  }
})