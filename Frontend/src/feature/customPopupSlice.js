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
            if(action.payload.message === null){
                state.message = action.payload.message
            } else {
                state.verfied = action.payload.verified
                state.message = action.payload.message
            }
            
            //if popup appears then only update the message. Else if false then keep it null 
            // if(state.popupToggleStatus) {
            //     state.message = action.payload.message
            // } else {
            //     state.message = null
            // }
        }
    }
})

export const { togglePopup , updateStatus_Message } = customPopupSlice.actions

export default customPopupSlice.reducer