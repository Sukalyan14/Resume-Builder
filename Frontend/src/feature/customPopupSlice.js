import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popupToggleStatus:false,
    verfied:false,
    message:null //on default null . After reset will also be sent to null
}

const customPopupSlice = createSlice({
    name:'custom_popup',
    initialState,
    reducers:{
        togglePopup:(state) => {
            state.popupToggleStatus = !state.popupToggleStatus
        },
        updateStatus_Message:(state , action) => {
            console.log(action.payload ,action.payload.verified)
            state.verfied = action.payload.verified
            state.message = action.payload.message
        }
    }
})

export const { togglePopup , updateStatus_Message } = customPopupSlice.actions

export default customPopupSlice.reducer