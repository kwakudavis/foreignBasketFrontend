import React from "react";
import { Field, reduxForm } from "redux-form";
//import Auth from "./Auth/Auth";
import _ from "lodash";
import GoogleButton from "react-google-button";
import * as firebaseAuthSource from "firebase/auth";
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import "./index.css";
import { connect } from "react-redux";
import {
  signIn,
  signOut,
  updateUserDetailsInStore,
  setCartModalState
} from "./actions";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase/firebaseConfig";
import { showModal } from "./components/isModalActive";

/////// Set up providers to be used
var googleprovider = new GoogleAuthProvider();

////// Set scopes for google auth provider
googleprovider.addScope("profile");
googleprovider.addScope("email");

class Accountpage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { userRecords: { mobile: 222, address: "wers" } };
  }

  triggeredOnChange = async (user) => {
    // this.renderOutputAccountPageBasedOnState();

    ///////Update is Logged in State with true if user is logged in
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
    }
  };

  updateUserDetails = (formData) => {
    ////Update phone number and address where user id equals the id provided
    //e.preventDefault();
    try {
      formData.uid = this.state.user.uid;
      
      if (!formData.mobile) {
        formData.mobile = null;
      }
      if (!formData.address) {
        formData.address = null;
      }
      
      this.props.updateUserDetailsInStore(formData);
      alert("Successfully updated");
    } catch (err) {
      
    }
  };

  renderOutputAccountPageBasedOnState = (loginState) => {
    /////If user is logged in, render account details and sign out button
    if (loginState) {
      

      return (
        <div>
          <div className="googleSignInandoutbuttonsDiv">
            <GoogleButton
              label="Sign Out"
              type="dark"
              onClick={() => {
                
                firebaseAuthSource.signOut(auth);
              }}
            />
          </div>
          <div className="accountpageForm">
            <form
              className="ui form account details"
              id="accountdetails"
              onSubmit={this.props.handleSubmit(this.updateUserDetails)}
            >
              <Field
                style={{ color: "black" }}
                name="name"
                component={this.renderInput}
                label="Full Name"
                placeholder={loginState.displayName}
              />

              <Field
                name="mobile"
                component={this.renderInput}
                label="Phone Number"
                placeholder={this.props.loginState.mobile}
              />
              <Field
                name="address"
                component={this.renderInput}
                label="Address"
                placeholder={this.props.loginState.address}
              />

              <button className="ui button primary" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      );

      //////If user is logged out, render sign in Button
    } else {
      
      return (
        <div>
          <div className="googleSignInandoutbuttonsDiv ">
            <GoogleButton
              type="light"
              onClick={() => {
                try {
                  firebaseAuthSource
                    .signInWithPopup(auth, googleprovider)
                    .then(function (result) {
                      // var user = result.user;
                    });
                } catch (err) {
                  
                }
              }}
            />
          </div>
        </div>
      );
    }
  };
  componentDidMount() {
    onAuthStateChanged(auth, this.triggeredOnChange);
  }

  renderInput = ({ input, label, meta, placeholder, value }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} placeholder={placeholder} value={value} />
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>
          {showModal(
            this.props.cartModalActive,
            this.props.setCartModalState,
            this.props.cart
          )}
        </div>
        {this.renderOutputAccountPageBasedOnState(this.state.user)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginState: state.loginState,
    cartModalActive: state.cartModalActive,
    cart: state.cart
  };
};

var firstWrap = connect(mapStateToProps, {
  signIn,
  signOut,
  updateUserDetailsInStore,
  setCartModalState
})(Accountpage);

export default reduxForm({
  form: "accountDetails"
})(firstWrap);
