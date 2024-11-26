import { configureStore } from '@reduxjs/toolkit'
import formSwitchSlice from '../feature/formSwitchSlice'
import customPopupSlice from '../feature/customPopupSlice'

export const store = configureStore({
    reducer:{
        register_login:formSwitchSlice,
        custom_popup:customPopupSlice
    }
})