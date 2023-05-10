import React from "react";
import _ from "lodash";
import Shoppageheader from "./components/Shoppageheader";

import DisplayProductResults from "./components/DisplayProductResults";

import "./index.css";
import { fetchStoresInventory, setCartModalState } from "./actions";
import { connect } from "react-redux";
import { CartModal } from "./Cartmodal";
import { showModal } from "./components/isModalActive";

import { DisplayCartItems } from "./components/DisplayCartItems";
import DisplayCartItemsOnCheckout from "./components/DisplayCartItemsOnCheckout";

import { Button } from "ic-snacks";

import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

import GoogleButton from "react-google-button";
import { db, auth } from "./firebase/firebaseConfig";

import { signIn, signOut } from "./actions";
import * as firebaseAuthSource from "firebase/auth";

import CheckOutForm from "./components/CheckOutForm";

/////// Set up providers to be used
var googleprovider = new GoogleAuthProvider();

////// Set scopes for google auth provider
googleprovider.addScope("profile");
googleprovider.addScope("email");

class CheckOutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  triggeredOnChange = async (user) => {
    // this.renderOutputAccountPageBasedOnState();

    ///////Update is Logged in global redux State with true if user is logged in
    if (user !== null) {
      /////
      this.props.signIn(user);

      /////// Fetch user's stored details and stoer in globalstate
      var addressV;
      var mobileV;
      var details;

      ///user.address = addressV;
      // user.mobile = mobileV;
      this.setState({ user: user });
    }
    //////Update is Logged in State with false if user is not logged in
    else {
      this.props.signOut();
      this.setState({ user: null });
      // console.log(this.props.loginState);
    }
  };

  renderLoggedInUserDetails(user) {
    /////// If user is logged in get user details and display logged in message
    if (user) {
      //////Get and set users Address and Phone Number

      return (
        <div style={{ fontSize: "13px", width: "140px", lineHeight: "15px" }}>
          By clicking Submit Order, you are continuing with your google account.
        </div>
      );
    } else {
      ////////Login Button
      return (
        <div>
          Login to get address:{" "}
          <GoogleButton
            style={{ fontSize: "7px", width: "140px", height: "50px" }}
            onClick={() => {
              try {
                firebaseAuthSource
                  .signInWithPopup(auth, googleprovider)
                  .then(function (result) {
                    // var user = result.user;
                  });
              } catch (err) {
                console.log(err);
              }
            }}
          />{" "}
        </div>
      );
    }
  }

  componentDidMount() {
    //////Check if user is logged in or not, and update global login state appropriately
    onAuthStateChanged(auth, this.triggeredOnChange);
  }

  isCartEmpty(cart) {
    if (cart === null || cart.length < 1) {
      return <div> There are no items in cart. </div>;
    }
  }

  submitOrder() {
    /////Display Order Submitted
    console.log("Order submitted succesfully");

    ////Redirect to shop page
  }

  render() {
    return (
      <div>
        {showModal(
          this.props.cartModalActive,
          this.props.setCartModalState,
          this.props.cart
        )}
        <div className="checkOutPageMainDiv">
          <div
            style={{
              border: "2px dotted black",
              padding: "4px",
              marginLeft: "10px",
              marginRight: "10px"
            }}
          >
            <h1 className="header">Cart</h1>
            <DisplayCartItemsOnCheckout cartItems={this.props.cart} />

            {this.isCartEmpty(this.props.cart)}
            <div style={{ marginTop: "40px" }}>
              <h4>Payment Method: </h4> Currently, we are only processing
              payments On delivery , we accept Cash, Visa and {""}
              <i className="cc visa icon" style={{ color: "blue" }}></i>{" "}
              Mastercard.{" "}
              <i className="cc mastercard icon" style={{ color: "red" }}></i>
            </div>
            <div style={{ marginTop: "20px" }}></div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "10px"
              }}
            >
              <div>{this.renderLoggedInUserDetails(this.state.user)}</div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {" "}
                <CheckOutForm user={this.state.user} />
              </div>
            </div>
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
    cartModalActive: state.cartModalActive,
    cart: state.cart
  };
};

export default connect(mapStateToProps, {
  fetchStoresInventory,
  setCartModalState,
  signIn,
  signOut
})(CheckOutPage);
