import { createStore, applyMiddleware,combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { productListReducer } from "./reducers/productReducers"

const reducer = combineReducers({
  productList: productListReducer,
});

const store = createStore(reducer, applyMiddleware(thunk))
export default store
