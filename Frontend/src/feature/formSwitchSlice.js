import { createSlice } from "@reduxjs/toolkit";

//formChange - false for login and true for register
const initialState = {
    formChange:true
}

const formSwitchSlice = createSlice({
    name:'register_login',
    initialState,
    reducers:{
        switchForm: (state) => {
            state.formChange = !state.formChange
        }
    }
})

export const { switchForm } = formSwitchSlice.actions

export default formSwitchSlice.reducer 