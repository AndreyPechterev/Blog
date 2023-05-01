import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/auth'

export const store = configureStore({
    reducer: {
        auth: authSlice,
    }
})