
import { createSlice } from '@reduxjs/toolkit';

export const SendMassagesSlice = createSlice({
    name: 'sendMassages',
    initialState: {
        sendMassages: {}
    },
    reducers: {
        SEND_MASSAGES_REQUEST: (state) => {
            state.loading = true;
            state.sendMassages = {};
        },
        SEND_MASSAGES_SUCCESS: (state, action) => {
            state.loading = false;
            state.sendMassages = action.payload;
        },
        SEND_MASSAGES_FAIL: (state, action) => {
            state.loading = false;
            state.sendMassages = action.payload;
        }
    }
});

export const { SEND_MASSAGES_REQUEST, SEND_MASSAGES_SUCCESS, SEND_MASSAGES_FAIL } = SendMassagesSlice.actions;

export default SendMassagesSlice.reducer;


