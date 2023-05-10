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

class DisplayCartItemsOnCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnClickAddItem(product, e) {
    e.preventDefault();

    this.props.addToCart(product);
  }

  handleOnClickDelete(product, e) {
    e.preventDefault();
    this.props.deleteFromCart(product);
  }

  handleOnclickRemoveItem(product, e) {
    e.preventDefault();
    this.props.removeFromCart(product);
  }

  returnItems = (items) => {
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

            <div
              style={{ display: "flex", justifyContent: "right", gap: "7px" }}
            >
              <div className="productPriceCart">€ {item.productPrice}</div>
              <div className="productQTYCart">QTY:{item.QTY}</div>
              <i
                className="trash alternate outline icon"
                onClick={(e) => this.handleOnClickDelete(item, e)}
              ></i>
              <i
                className="minus circle icon"
                onClick={(e) => this.handleOnclickRemoveItem(item, e)}
              ></i>
              |
              <i
                className="plus circle icon"
                onClick={(e) => this.handleOnClickAddItem(item, e)}
              ></i>
              {""}
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div>
        {" "}
        {this.returnItems(this.props.cart)}
        <hr className="orderTotalDivider" />
        <div className="deliveryFee">Standard delivery fee: €4.99</div>
        OrderTotal:{" "}
        <span style={{ fontWeight: 700, fontSize: "23px" }}>
          € {calculateOrderTotal(this.props.cart)}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    storesInvetory: state.storesInvetory,
    products: state.products,
    inventories: state.storesInvetory,
    stores: state.stores,
    cart: state.cart
  };
};

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  deleteFromCart
})(DisplayCartItemsOnCheckout);
