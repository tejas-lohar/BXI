
import { createSlice } from '@reduxjs/toolkit';

export const NewQuerySlice = createSlice({
    name: 'New_Query',
    initialState: {
        newQuery: {}
    },
    reducers: {
        NEW_QUERY_REQUEST: (state) => {
            state.loading = true;
            state.newQuery = {};
        },
        NEW_QUERY_SUCCESS: (state, action) => {
            state.loading = false;
            state.newQuery = action.payload;
        },
        NEW_QUERY_FAIL: (state, action) => {
            state.loading = false;
            state.newQuery = action.payload;
        }
    }
});

export const { NEW_QUERY_REQUEST, NEW_QUERY_SUCCESS, NEW_QUERY_FAIL } = NewQuerySlice.actions;

export default NewQuerySlice.reducer;


