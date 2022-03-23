import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { productListReducer } from "./reducers/productReducers";
import thunk from "redux-thunk";
const reducer = combineReducers({
  productList: productListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
export default store;
