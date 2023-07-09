import { createSlice } from "@reduxjs/toolkit";

export const PaymentVerificationSlice = createSlice({
    name: "PaymentVerification",
    initialState: {
        PaymentVerification: {},
    },
    reducers: {
        PAYMENT_VERIFICATION_REQUEST: (state) => {
            state.loading = true;
            state.PaymentVerification = {};
        },
        PAYMENT_VERIFICATION_SUCCESS: (state, action) => {
            state.loading = false;
            state.PaymentVerification = action.payload;
        },
        PAYMENT_VERIFICATION_FAIL: (state, action) => {
            state.loading = false;
            state.PaymentVerification = action.payload;
        },
    },
});

export const {
    PAYMENT_VERIFICATION_REQUEST,
    PAYMENT_VERIFICATION_SUCCESS,
    PAYMENT_VERIFICATION_FAIL,
} = PaymentVerificationSlice.actions;
export default PaymentVerificationSlice.reducer;
