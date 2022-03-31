import React from "react";
import { useState, useEffect } from "react";
import store from "../store";

function Checkout(props) {
  let [totalPrice, setTotalPrice] = useState(0);

  const setPrice = () => {
    let sum = 0;
    store.getState().map((item) => {
      sum += item.price * item.qty;
    });
    setTotalPrice(sum);
  };

  useEffect(() => {
    setPrice();
  }, []);

  return (
    <div>
      <h3>Total price: {totalPrice}$</h3>
    </div>
  );
}

export default Checkout;
