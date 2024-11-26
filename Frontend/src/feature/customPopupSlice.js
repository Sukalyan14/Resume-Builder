import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popupToggleStatus:false
}

const customPopupSlice = createSlice({
    name:'custom_popup',
    initialState,
    reducers:{
        togglePopup:(state , action) => {
            state.popupToggleStatus = !state.popupToggleStatus
        }
    }
})

export const { togglePopup } = customPopupSlice.actions

export default customPopupSlice.reducer