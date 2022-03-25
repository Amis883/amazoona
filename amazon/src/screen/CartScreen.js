import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";

export default function CartScreen() {
  const { id } = useParams();
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const productId = id;
  const qty = search ? Number(search.split("=")[1]) : 1;

  console.log({ productId, qty, qtyParam: Number(searchParams.get("qty")) });
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h1>CartScreen</h1>
      <p>
        ADD TO CART:ProductID:{productId}Qty:{qty}
      </p>
    </div>
  );
}
