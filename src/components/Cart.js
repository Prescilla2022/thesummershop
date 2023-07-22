import React, { useState } from "react";
import arrow from "../images/right-arrow.png";
import { dataContext } from "../App.js";
import { useContext } from "react";
export default function Cart() {
  const myContext = useContext(dataContext);
  const [cartData, setCartData] = useState([]);
  const [price, setPrice] = useState(0);

  function closeCart() {
    console.log("hello");
    myContext.setCartVisibility(false);
  }

  return (
    <div
      className="cartContainer"
      style={{ visibility: myContext.cartVisibility ? "visible" : "hidden" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "5%",
        }}
      >
        <div>SHOPPINGBAG({myContext.items})</div>
        <img src={arrow} className="rightArrow" onClick={closeCart}></img>
      </div>
      <div className="line">{myContext.cartData}</div>
      <p style={{ marginLeft: "5%" }}>TOTAL:${myContext.totalPrice}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "5%",
        }}
      >
        <button style={{ border: "none", backgroundColor: "lightGrey" }}>
          VIEWCART
        </button>
        <button style={{ backgroundColor: "black", color: "white" }}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
}
