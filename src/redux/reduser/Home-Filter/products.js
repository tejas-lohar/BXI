
import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        product_Request: (state) => {
            state.loading = true;
            state.products = [];
        },
        product_Success: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        product_Fail: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        }
    }
});

export const { product_Request, product_Success, product_Fail } = productSlice.actions;

export default productSlice.reducer;


