import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/auth'
import  postSlice  from './features/post/post'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postSlice,
    }
})