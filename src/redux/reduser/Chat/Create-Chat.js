
import { createSlice } from '@reduxjs/toolkit';

export const NewChatSlice = createSlice({
    name: 'New_Chat',
    initialState: {
        newChat: {}
    },
    reducers: {
        NEW_CHAT_REQUEST: (state) => {
            state.loading = true;
            state.newChat = {};
        },
        NEW_CHAT_SUCCESS: (state, action) => {
            state.loading = false;
            state.newChat = action.payload;
        },
        NEW_CHAT_FAIL: (state, action) => {
            state.loading = false;
            state.newChat = action.payload;
        }
    }
});

export const { NEW_CHAT_REQUEST, NEW_CHAT_SUCCESS, NEW_CHAT_FAIL } = NewChatSlice.actions;

export default NewChatSlice.reducer;


