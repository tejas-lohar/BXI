
import { createSlice } from '@reduxjs/toolkit';

export const GetChatsSlice = createSlice({
    name: 'Chats',
    initialState: {
        chats: []
    },
    reducers: {
        ALL_CHAT_REQUEST: (state) => {
            state.loading = true;
            state.chats = [];
        },
        ALL_CHAT_SUCCESS: (state, action) => {
            state.loading = false;
            state.chats = action.payload;
        },
        ALL_CHAT_FAIL: (state, action) => {
            state.loading = false;
            state.chats = action.payload;
        }
    }
});

export const { ALL_CHAT_REQUEST, ALL_CHAT_SUCCESS, ALL_CHAT_FAIL } = GetChatsSlice.actions;

export default GetChatsSlice.reducer;


