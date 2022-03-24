import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";
export const listProducts = () => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
      const response = await axios.get("api/products/");
      // console.log("axios response", response);
      return dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response });
    } catch (error) {
      // console.log("axios error", error);
      return dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  console.log("id", productId);
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    console.log("id", productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
