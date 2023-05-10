import React from "react";
import ReactDOM from "react-dom";
import _, { fromPairs } from "lodash";

import "./index.css";
import { DisplayCartItems } from "./components/DisplayCartItems";
import { OrderTotal } from "./components/OrderTotal";

/** 
const displayCartItems = function (items) {
 

  console.log(items);

  return _.forEach(items, function (o) {
    console.log(o);
    return <div>o.productId</div>;
  });
  // _.forEach(items, function (value) {
  //   return <div>value.productId</div>;
  // });
};*/

export const CartModal = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header"> {props.title} </div>
        <div className="content">
          {" "}
          <DisplayCartItems cartItems={props.items} />
          <div></div>
        </div>
        <div className="actions"> {props.actions} </div>
      </div>
    </div>,
    document.querySelector("section")
  );
};
