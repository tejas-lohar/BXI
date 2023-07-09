
import { createSlice } from '@reduxjs/toolkit';

export const GetAllFilesSlice = createSlice({
    name: 'allFiles',
    initialState: {
        allFiles: []
    },
    reducers: {
        GET_FILES_REQUEST: (state) => {
            state.loading = true;
            state.allFiles = [];
        },
        GET_FILES_SUCCESS: (state, action) => {
            state.loading = false;
            state.allFiles = action.payload;
        },
        GET_FILES_FAIL: (state, action) => {
            state.loading = false;
            state.allFiles = action.payload;
        }
    }
});

export const { GET_FILES_REQUEST, GET_FILES_SUCCESS, GET_FILES_FAIL } = GetAllFilesSlice.actions;

export default GetAllFilesSlice.reducer;


