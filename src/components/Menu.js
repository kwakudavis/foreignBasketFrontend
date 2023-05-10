import React from "react";
import { Link } from "react-router-dom";
import { CartModal } from "../Cartmodal";
import { connect } from "react-redux";
import { setCartModalState } from "../actions";
import _ from "lodash";

///onClick={() => this.setState({ open: !this.state.open })}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  rendercartSize(cart) {
    console.log("bombo");
    console.log(cart);
    var total = 0;
    if (cart.length > 0) {
      _.forEach(cart, function (item) {
        total += _.toInteger(item.QTY);
        console.log(total);
      });
    }

    return total;
  }

  render() {
    return (
      <div className="menuDiv">
        <div className="mainmenu">
          <div className="menuLeftColumn">
            <Link to="/">
              <img
                style={{
                  width: "100px",
                  height: "76px"
                }}
                src="/assets/AfroandAsianlogo.png"
              ></img>
            </Link>
            <Link to="/">
              <div
                style={{
                  fontFamily: "Cormorant",
                  fontWeight: "900",
                  color: "#06451f",
                  fontSize: 17,
                  marginTop: "33%",
                  marginLeft: "-25%"
                  // position: "absolute",
                }}
              >
                ForeignBasket
              </div>
            </Link>
          </div>
          <div className="menuRightColumn">
            <Link
              to="/Support"
              //  className="menuitem"
              style={{
                fontFamily: "Cormorant",
                position: "relative",

                fontWeight: "900",
                color: "#06451f",
                fontSize: 14 //,
                // position: "absolute",
                // margin: "45px 120px"
              }}
            >
              <i
                style={
                  {
                    //position: "absolute"
                    //display: "inline !important"
                    // position: "relative"//,
                    // margin: "0px 3px"
                  }
                }
                className="comments icon storeFrontCart "
              ></i>{" "}
              Support
            </Link>

            <Link
              to="/Account"
              //  className="menuitem"
              style={{
                fontFamily: "Cormorant",
                fontWeight: "900",
                color: "#06451f",
                fontSize: 16 //,
                // position: "absolute",
                // margin: "45px 120px"
              }}
            >
              <i
                style={
                  {
                    //position: "absolute"
                    //display: "inline !important"
                    // position: "relative"//,
                    // margin: "0px 3px"
                  }
                }
                className="user icon storeFrontCart"
              ></i>{" "}
              Account
            </Link>

            <button
              to="/cart"
              //className="menuitem"
              onClick={() => {
                this.props.setCartModalState();
              }}
              style={{
                fontFamily: "Cormorant",
                fontWeight: "900",
                backgroundColor: "#ffffff",

                //  position: "absolute",
                //   margin: "45px 180px",
                padding: "11px",
                height: "40px",
                borderColor: "#06451f",
                borderRadius: "11px",
                borderWidth: "1px",
                marginLeft: "2%",
                marginRight: "7px"
              }}
            >
              <i
                className="shopping cart icon storeFrontCart"
                style={{
                  float: "left"
                }}
              >
                {" "}
              </i>
              <span
                id="cartQuantity"
                style={{
                  color: "#06451f",
                  position: "absolute",
                  marginTop: "23px",
                  marginRight: "7px",
                  //float: "right",
                  fontWeight: "900",
                  fontSize: "22px"
                }}
              >
                {this.rendercartSize(this.props.cart)}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps, { setCartModalState })(Menu);
