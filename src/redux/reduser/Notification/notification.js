
import { createSlice } from '@reduxjs/toolkit';

export const NotificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: {}
    },
    reducers: {
        NOTIFICATION_REQUEST: (state) => {
            state.loading = true;
            state.notification = {};
        },
        NOTIFICATION_SUCCESS: (state, action) => {
            state.loading = false;
            state.notification = action.payload;
        },
        NOTIFICATION_FAIL: (state, action) => {
            state.loading = false;
            state.notification = action.payload;
        }
    }
});

export const { NOTIFICATION_REQUEST, NOTIFICATION_SUCCESS, NOTIFICATION_FAIL } = NotificationSlice.actions;
export default NotificationSlice.reducer;


