import { configureStore } from '@reduxjs/toolkit'
import formSwitchReducer from '../feature/formSwitchSlice'

export const store = configureStore({
    reducer:{
        register_login:formSwitchReducer
    }
})