
import { createSlice } from '@reduxjs/toolkit';

export const GetNotificationSlice = createSlice({
    name: 'getNotification',
    initialState: {
        getNotification: []
    },
    reducers: {
        GET_NOTIFICATION_REQUEST: (state) => {
            state.loading = true;
            state.getNotification = [];
        },
        GET_NOTIFICATION_SUCCESS: (state, action) => {
            state.loading = false;
            state.getNotification = action.payload;
        },
        GET_NOTIFICATION_FAIL: (state, action) => {
            state.loading = false;
            state.getNotification = action.payload;
        }
    }
});

export const { GET_NOTIFICATION_REQUEST, GET_NOTIFICATION_SUCCESS, GET_NOTIFICATION_FAIL } = GetNotificationSlice.actions;
export default GetNotificationSlice.reducer;


