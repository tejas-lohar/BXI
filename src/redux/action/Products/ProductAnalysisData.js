import axios from "axios";

import {
    PRODUCT_ANALYSIS_LASTWEEK_REQUEST,
    PRODUCT_ANALYSIS_LASTWEEK_SUCCESS,
    PRODUCT_ANALYSIS_LASTWEEK_FAIL
} from "../../reduser/Products/ProductAnalysisData/ProductAnalysisDataOfLastWeek";

import {
    PRODUCT_ANALYSIS_LASTMONTH_REQUEST,
    PRODUCT_ANALYSIS_LASTMONTH_SUCCESS,
    PRODUCT_ANALYSIS_LASTMONTH_FAIL,
} from "../../reduser/Products/ProductAnalysisData/ProductAnalysisDataOfLastMonth";

import {
    PRODUCT_ANALYSIS_LAST_THREEMONTH_REQUEST,
    PRODUCT_ANALYSIS_LAST_THREEMONTH_SUCCESS,
    PRODUCT_ANALYSIS_LAST_THREEMONTH_FAIL,
} from "../../reduser/Products/ProductAnalysisData/ProductAnalysisDataOfThreeMonth";

import {
    PRODUCT_ANALYSIS_LAST_SIXMONTH_REQUEST,
    PRODUCT_ANALYSIS_LAST_SIXMONTH_SUCCESS,
    PRODUCT_ANALYSIS_LAST_SIXMONTH_FAIL,
} from "../../reduser/Products/ProductAnalysisData/ProductAnalysisDataOfSixMonth";

import {
    PRODUCT_ANALYSIS_LASTYEAR_SUCCESS,
    PRODUCT_ANALYSIS_LASTYERA_REQUEST,
    PRODUCT_ANALYSIS_LASTYEAR_FAIL,
} from "../../reduser/Products/ProductAnalysisData/ProductAnalysisDataOfLastYear";

import {
    PRODUCT_ANALYSIS_LAST_FIVEYERA_REQUEST,
    PRODUCT_ANALYSIS_LAST_FIVEYERA_SUCCESS,
    PRODUCT_ANALYSIS_LAST_FIVEYERA_FAIL,
} from "../../reduser/Products/ProductAnalysisData/ProductAnalysisDataOfLastFiveYears";

export const ProductAnalysisDataOfLastWeeks = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_ANALYSIS_LASTWEEK_REQUEST.toString() });

        let link = `product/productanalysisdataoflastweek?id=${id}`;

        const { data } = await axios.get(link, { withCredentials: true });

        dispatch({
            type: PRODUCT_ANALYSIS_LASTWEEK_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_ANALYSIS_LASTWEEK_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};

export const ProductAnalysisDataOfLastMonths = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_ANALYSIS_LASTMONTH_REQUEST.toString() });

        let link = `product/productanalysisdataoflastOneMonth?id=${id}`;

        const { data } = await axios.get(link, { withCredentials: true });

        dispatch({
            type: PRODUCT_ANALYSIS_LASTMONTH_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_ANALYSIS_LASTMONTH_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};


export const ProductAnalysisDataOfThreeMonths = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_ANALYSIS_LAST_THREEMONTH_REQUEST.toString() });

        let link = `product/productanalysisdataoflastthreeMonth?id=${id}`;

        const { data } = await axios.get(link, { withCredentials: true });

        dispatch({
            type: PRODUCT_ANALYSIS_LAST_THREEMONTH_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_ANALYSIS_LAST_THREEMONTH_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};


export const ProductAnalysisDataOfSixMonths = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_ANALYSIS_LAST_SIXMONTH_REQUEST.toString() });

        let link = `product/productanalysisdataoflastsixMonth?id=${id}`;

        const { data } = await axios.get(link, { withCredentials: true });

        dispatch({
            type: PRODUCT_ANALYSIS_LAST_SIXMONTH_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_ANALYSIS_LAST_SIXMONTH_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};


export const ProductAnalysisDataOfLastYears = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_ANALYSIS_LASTYERA_REQUEST.toString() });

        let link = `product/productanalysisdataoflastyear?id=${id}`;

        const { data } = await axios.get(link, { withCredentials: true });

        dispatch({
            type: PRODUCT_ANALYSIS_LASTYEAR_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_ANALYSIS_LASTYEAR_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};


export const ProductAnalysisDataOfLastFiveYears = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_ANALYSIS_LAST_FIVEYERA_REQUEST.toString() });

        let link = `product/productanalysisdataofyears?id=${id}`;

        const { data } = await axios.get(link, { withCredentials: true });

        dispatch({
            type: PRODUCT_ANALYSIS_LAST_FIVEYERA_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_ANALYSIS_LAST_FIVEYERA_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};


