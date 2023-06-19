import React from "react";
import _ from "lodash";
import "../index.css";
import { connect } from "react-redux";
import { addToCart } from "../actions";
import { removeFromCart } from "../actions";
import { deleteFromCart } from "../actions";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = { QTY: 0 };

    this.handleOnClickAddItem = this.handleOnClickAddItem.bind(this);
  }

  componentDidMount() {
    
  }

  /////// Handles addition of product to cart
  handleOnClickAddItem = async (product, e) => {
    e.preventDefault();
    await this.props.addToCart(product);

    ///////Update cart
    this.setState({ QTY: this.numberInCart(product.productId) });
  };

  /////Handles removal of product from cart

  handleOnclickRemoveItem = async (product, e) => {
    e.preventDefault();
    await this.props.removeFromCart(product);

    ///////Update cart
    this.setState({ QTY: this.numberInCart(product.productId) });
  };

  

  ////////Counts the number of a particular product in cart
  numberInCart(productId) {
    //////Find product in cart where productId matches product's id in cart,
    ////// returns undefined if product is not found in cart.
    const fetchedProduct = _.find(this.props.cart, function (o) {
      return o.productId === productId;
    });

    //////// If productInCart is undefined, return 0
    if (fetchedProduct !== undefined) {
      return fetchedProduct.QTY;
    } else {
      //////Else return the QTY of the product in the Cart
      return 0;
    }
  }
  
 
  render() {
    return (
      <div className="ui card"  >
        <div className="content" >
          <div className="productQuantity">
            <span> {this.state.QTY}</span>
          </div>
          <div>
            <span className="productInStock">
              {this.props.product.productInStock ? "" : "Out of Stock"}
            </span>
          </div>
          <div className="productImageDiv">
            <img
              className="productImage"
              alt=""
              src={this.props.product.productImgUrl}
            ></img>
          </div>

          <div className="productName">
            {_.capitalize(this.props.product.productName)}{" "}
          </div>

          <div className="productPrice">
            {"€"}
            {parseFloat(this.props.product.productPrice).toFixed(2)}{" "}
          </div>
          <div className="addorRemoveProductButton" >
            <button
             
              disabled={!this.props.product.productInStock}
              className="ui mini orange circular button"
              onClick={(e) => this.handleOnClickAddItem(this.props.product, e)}
            ><i className="white plus icon"></i></button>
            
            <button
            disabled={!this.props.product.productInStock}
            className="ui mini black circular button"
             onClick={(e) =>
              this.handleOnclickRemoveItem(this.props.product, e)
            }
            >
            <i
              
              className="minus  icon"
             

            ></i>
            </button>
          </div>
        </div>
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
})(Product);
