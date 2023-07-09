import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
} from "../../reduser/PaymentGetway/CreateOrder";

import {
    PAYMENT_VERIFICATION_REQUEST,
    PAYMENT_VERIFICATION_SUCCESS,
    PAYMENT_VERIFICATION_FAIL,
} from "../../reduser/PaymentGetway/PaymentVerifie";

export const OrderCreates = (
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount
) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST.toString() });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        const link = `product_type/createorder`;

        const { data } = await axios.post(
            link,
            {
                shippingInfo,
                orderItems,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingCharges,
                totalAmount,
            },
            config
        );

        dispatch({
            type: ORDER_CREATE_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL.toString(),
            payload: error.response?.data?.message || "An error occurred.",
        });
    }
};

export const PaymentVerifies = (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    orderOptions
) => async (dispatch) => {
    try {
        dispatch({ type: PAYMENT_VERIFICATION_REQUEST.toString() });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        const link = `product_type/paymentverification`;

        const { data } = await axios.post(
            link,
            {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                orderOptions,
            },
            config
        );
        dispatch({
            type: PAYMENT_VERIFICATION_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PAYMENT_VERIFICATION_FAIL.toString(),
            payload: error.response?.data?.message || "An error occurred.",
        });
    }
};
