
import { createSlice } from '@reduxjs/toolkit';

export const GetAllMassagesSlice = createSlice({
    name: 'allMassages',
    initialState: {
        aLLMassages: []
    },
    reducers: {
        GET_MASSAGES_REQUEST: (state) => {
            state.loading = true;
            state.aLLMassages = [];
        },
        GET_MASSAGES_SUCCESS: (state, action) => {
            state.loading = false;
            state.aLLMassages = action.payload;
        },
        GET_MASSAGES_FAIL: (state, action) => {
            state.loading = false;
            state.aLLMassages = action.payload;
        }
    }
});

export const { GET_MASSAGES_REQUEST, GET_MASSAGES_SUCCESS, GET_MASSAGES_FAIL } = GetAllMassagesSlice.actions;

export default GetAllMassagesSlice.reducer;


