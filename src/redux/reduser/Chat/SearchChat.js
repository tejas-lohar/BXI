import { createSlice } from '@reduxjs/toolkit';

export const SearchChatSlice = createSlice({
    name: 'searchChat',
    initialState: {
        searchChat: []
    },
    reducers: {
        SEARCH_CHAT_REQUEST: (state) => {
            state.loading = true;
            state.searchChat = [];
        },
        SEARCH_CHAT_SUCCESS: (state, action) => {
            state.loading = false;
            state.searchChat = action.payload;
        },
        SEARCH_CHAT_FAIL: (state, action) => {
            state.loading = false;
            state.searchChat = action.payload;
        }
    }
});

export const { SEARCH_CHAT_REQUEST, SEARCH_CHAT_SUCCESS, SEARCH_CHAT_FAIL } = SearchChatSlice.actions;

export default SearchChatSlice.reducer;


