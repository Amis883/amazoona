import { combineReducers, createStore } from "redux";
import { productListReducer } from "./reducers/productReducers";
const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
});

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({
      serialize: true,
    })
);

export default store;
