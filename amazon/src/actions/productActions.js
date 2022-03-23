import {
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
      console.log("axios response", response);
      return dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response });
    } catch (error) {
      console.log("axios error", error);
      return dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };
};
