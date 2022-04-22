import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { useNavigate } from "react-router-dom";

export default function ProductListScreen() {
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  // getting data from product creates in redux store
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const dispatch = useDispatch();
  useEffect(() => {
    // it means that I successfully created a product so I need to dispatch reset.
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/product/${createdProduct._id}/edit`);
    }
  }, [createdProduct, dispatch, navigate, successCreate]);
  const createHandler = () => {
    dispatch(createProduct());
  };
  const deleteHandler = () => {
    // todo
  };
  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Products
        </button>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.data.products.map((product) => (
                <tr key={product._id}>
                  <td> {product._id}</td>
                  <td> {product.name}</td>
                  <td> {product.price}</td>
                  <td> {product.category}</td>
                  <td> {product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => navigate(`/product/${product._id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
