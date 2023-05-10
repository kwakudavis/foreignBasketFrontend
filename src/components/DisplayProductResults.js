import React from "react";
import _ from "lodash";
import "../index.css";
import { connect } from "react-redux";
import Product from "./Product";
import { addToCart } from "../actions";

class DisplayProductResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderProduct() {
    return this.props.productResults.map((product) => {
      return (
        <div className="productCard">
          <Product product={product} />
        </div>
      );
    });
  }

  render() {
    return <div className="products">{this.renderProduct()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    storesInvetory: state.storesInvetory,
    products: state.products,
    inventories: state.storesInvetory,
    stores: state.stores
  };
};

export default connect(mapStateToProps, { addToCart })(DisplayProductResults);
