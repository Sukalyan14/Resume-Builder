import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

//formChange - false for login and true for register
const initialState = {
    formChange:true
}

export const register_login_formSlice = createSlice({
    name:'register_login',
    initialState,
    reducers:{
        switchForm: (state , action) => {
            state.formChange = action.payload
        }
    }
})

export const {switchForm} = register_login_formSlice.actions

export default register_login_formSlice.reducer 