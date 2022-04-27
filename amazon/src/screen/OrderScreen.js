import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
export default function OrderScreen(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { id: orderId } = params;
  const [sdkReady, setSdkReady] = useState(false);

  //fetch ORDER_DETAILS from redux store
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  //---DELIVERED---
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  //get ORDER_PAY from redux...get accssee to reduce and from the stste and i gonna get only orderpay
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  //--ORDER_DELIVERED--
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    // loading: loadingDeliver,
    // error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      //create script element and set the source of element to the paypal sdk
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      //onload happens  when  this script download that in your browser and its ready to use
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    //order does not loaded from backend
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      // RESET vase inke dobare nakhayem ino az backend begirim mizarm
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(detailsOrder(orderId));
    } else {
      //if i have order
      if (!order.isPaid) {
        //then i need to check if i already loaded the paypal
        if (!window.paypal) {
          // if i have not loaded  paypal then i need to call  add paypal script function
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, order, orderId, sdkReady]);
  const successPaymentHandler = (paymentResult) => {
    //paymentresult : is  result in payment  on paypal
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {/* check if order.ispaid is false   */}
              {!order.isPaid && (
                <li>
                  {/* if sdkready is false means i am still loading paypal */}

                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox>{}</LoadingBox>}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  <button
                    type="button"
                    className="primary black"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
