import React from "react";
import { connect } from "react-redux";
import { submitOrderForm } from "../actions";
import { addToCart } from "../actions";
import { removeFromCart } from "../actions";
import { deleteFromCart } from "../actions";
import { PreferredDeliverTimeForm } from "./PreferredDeliveryTimeForm";
import _ from "lodash";
import toast, { Toaster } from 'react-hot-toast'



class CheckOutForm extends React.Component {
  constructor(props) {
    super(props);

    ////Time Options
    const weekdayOptions = ["18:30 - 20:00"];
    const weekendOptions = [
      "15:00 - 17:00",
      "18:30 - 20:00"
    ];

  
    var preferredTimeOptions;

    ////Load Weekend and Weekday Options for store based on the day of the week
    var today = new Date();
    var dayOfTheWeek = today.getDay();





    /////Choose delivery time options based on the day of the week
    if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
      preferredTimeOptions = weekendOptions;
    } else {
      preferredTimeOptions = weekdayOptions;
    }

    

    this.state = {
      address: props.loginState.address,
      mobile: props.loginState.mobile,
      email: props.loginState.email,
      preferredTime: preferredTimeOptions[0],
      preferredTimeOptions: preferredTimeOptions
    };

    ////// If a user prop was passed, override initial values

    this.handleUpdateAddress = this.handleUpdateAddress.bind(this);
    this.handleUpdateMobile = this.handleUpdateMobile.bind(this);
    this.handleUpdateDeliveryTime = this.handleUpdateDeliveryTime.bind(this);
    this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
  }

  renderOptions(preferredTimeOptions) {
    return preferredTimeOptions.map((option) => {
      return <option value={option}>{option}</option>;
    });
  }

  /////Handles removal of product from cart
  /**/

  handleOnclickRemoveItem = async (product, e) => {
    e.preventDefault();
    await this.props.removeFromCart(product);

    ///////Update cart
    // this.setState({ QTY: this.numberInCart(product.productId) });
  };

  handleUpdateDeliveryTime(event) {
    try {
      var value = event.target.value;

      this.setState({ preferredTime: value });
    } catch (err) {
      
    }
  }

  handleUpdateAddress(event) {
    try {
      var value = event.target.value;

      this.setState({ address: value });
    } catch (err) {
      
    }
  }

  
  //Define the toast used to display confirmation of order.
  notify = () => toast('Thank you for ordering from Foreign Basket, we will get in touch once we start picking up your order. You should receive an order confirmation email from us shortly',{duration: 10000, position: "top-center", icon: '👏' });

  
//Define the toast used to display invalid mobile.
  notifyInvalidMobile = () => toast('Kinldy enter a valid mobile number',{position: "top-center" });

//Define the toast used to display invalid Email.
  notifyInvalidEmail = () => toast('Kinldy enter a email address',{position: "top-center" });




  submitOrder = async (e, state) => {
    e.preventDefault();

    ///If the user has no items in cart, raise alert
    if (this.props.cart.length === 0) {
      alert("Empty cart");

      return;
    }

    ///If time is after 8pm don't accept order

    var timeOfOrder = new Date();
    var hourOfOrder = timeOfOrder.getHours();

    if (hourOfOrder >= 24) {
      alert(
        "Dear customer, sorry we are currently only accepting orders before 6pm, please come again tomorrow."
      );
      return;
    }

    //////If no Address && mobile number has been inserted, raise an alert.
    // Regular expression for email validation
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regular expression for mobile validation (10 digit US format)
    const mobileRegEx = /^(?:\+356|00356)?[0-9]{8}$/;


    // Validate email
    if (!emailRegEx.test(state.email)) {
      this.notifyInvalidEmail();
      return;
    }

    // Validate mobile
    else if (!mobileRegEx.test(state.mobile)) {
      this.notifyInvalidMobile();
      return;
    }
    
    else {
      ////Submit order
      //this.setState({ checkedOutCart: this.props.cart });

      this.props.submitOrderForm(state);

      ///Trigger order confirmation toast
      this.notify();
    }
  };

  handleUpdateMobile(event) {
    try {
      var value = event.target.value;

      this.setState({ mobile: value });
    } catch (err) {
     
    }
  }

  handleUpdateEmail(event) {
    try {
      var value = event.target.value;

      this.setState({ email: value });
    } catch (err) {
      
    }
  }

  

  render() {
    return (
      
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Toaster/>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ display: "flex", flexDirection: "column" }}>
            Address
            <textarea
              label="address"
              value={this.state.address}
              onChange={this.handleUpdateAddress}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            Mobile:
            <input
              label="mobile"
              value={this.state.mobile}
              onChange={this.handleUpdateMobile}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            Email:
            <input
              label="email"
              value={this.state.email}
              onChange={this.handleUpdateEmail}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            Preferred Time of Delivery:
            <select
              value={this.state.preferredTime}
              onChange={this.handleUpdateDeliveryTime}
            >
              {this.renderOptions(this.state.preferredTimeOptions)}
            </select>
          </label>

          <div style={{ padding: "7px", marginTop: "20px" }}>
            <input
              className="ui green button"
              type="submit"
              value="Submit Order"
              onClick={(e) => {
                this.submitOrder(e, this.state);
              }}
            />
          </div>
        </form>
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
    cart: state.cart,
    loginState: state.loginState
  };
};

export default connect(mapStateToProps, {
  submitOrderForm,
  addToCart,
  removeFromCart,
  deleteFromCart
})(CheckOutForm);
