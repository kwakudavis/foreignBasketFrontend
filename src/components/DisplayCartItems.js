import React from "react";
import ReactDOM, { render } from "react-dom";

import _ from "lodash";
import { connect } from "react-redux";
import { addToCart } from "../actions";
import { removeFromCart } from "../actions";
import { deleteFromCart } from "../actions";
import "../index.css";
import { calculateOrderTotal } from "../helperFunctions/calculateOrderTotal";

/////// Handles addition of product to cart

const handleOnClickAddItem = async (product, e) => {
  e.preventDefault();
  addToCart(product);
};

const handleOnClickDelete = async (product, e) => {
  e.preventDefault();
  deleteFromCart(product);
};

/////Handles removal of product from cart
const handleOnclickRemoveItem = async (product, e) => {
  e.preventDefault();
  removeFromCart(product);
};

const returnItems = (items) => {
  if (items) {
    return items.map((item) => {
      return (
        <div
          className="modalCartItems"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "3px"
          }}
        >
          <div className="productNameCart">{item.productName}</div>

          <div style={{ display: "flex", justifyContent: "right", gap: "7px" }}>
            <div className="productPriceCart">€ {item.productPrice}</div>
            <div className="productQTYCart">x{item.QTY}</div>

            {""}
          </div>
        </div>
      );
    });
  }
};

export const DisplayCartItems = (props) => {
  return (
    <div className="orderTotalCart">
      {" "}
      {returnItems(props.cartItems)}
      <hr className="orderTotalDivider" />
      <div className="deliveryFee">Standard delivery fee: €4.99</div>
      OrderTotal: € {calculateOrderTotal(props.cartItems)}
    </div>
  );
};
