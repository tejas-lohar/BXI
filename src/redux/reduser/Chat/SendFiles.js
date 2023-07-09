
import { createSlice } from '@reduxjs/toolkit';

export const SendFilesSlice = createSlice({
    name: 'sendFiles',
    initialState: {
        sendFiles: {}
    },
    reducers: {
        SEND_FILES_REQUEST: (state) => {
            state.loading = true;
            state.sendFiles = {};
        },
        SEND_FILES_SUCCESS: (state, action) => {
            state.loading = false;
            state.sendFiles = action.payload;
        },
        SEND_FILES_FAIL: (state, action) => {
            state.loading = false;
            state.sendFiles = action.payload;
        }
    }
});

export const { SEND_FILES_REQUEST, SEND_FILES_SUCCESS, SEND_FILES_FAIL } = SendFilesSlice.actions;

export default SendFilesSlice.reducer;


