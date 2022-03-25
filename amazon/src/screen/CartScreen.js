import React from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

export default function CartScreen() {
  const { id } = useParams();
  const { search } = useLocation();
  const [searchParams] = useSearchParams();

  const productId = id;
  const qty = search ? Number(search.split("=")[1]) : 1;

  console.log({ productId, qty, qtyParam: Number(searchParams.get("qty")) });
  return (
    <div>
      <h1>CartScreen</h1>
      <p>
        ADD TO CART:ProductID:{productId}Qty:{qty}
      </p>
    </div>
  );
}
