import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { showModal } from "./components/isModalActive";
import { fetchStores } from "./actions";
import { fetchProducts } from "./actions";
import { fetchStoresInventory, setCartModalState } from "./actions";
import { connect } from "react-redux";

class Supportpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {showModal(
          this.props.cartModalActive,
          this.props.setCartModalState,
          this.props.cart
        )}

        <div className="supportDiv">
          {" "}
          <a target="_blank_" href="https://wa.me/message/TNALUPTG4KLLN1">
            {" "}
            <div className="whatsappsupportDiv">
              Chat with us on Whatsapp
              <i
                style={{
                  color: "white",
                  padding: "12px"
                  //position: "absolute"
                  //display: "inline !important"
                  // position: "relative"//,
                  // margin: "0px 3px"
                }}
                className="whatsapp icon storeFrontCart"
              ></i>{" "}
            </div>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stores: state.stores,
    products: state.products,
    cartModalActive: state.cartModalActive,
    cart: state.cart
  };
};

export default connect(mapStateToProps, {
  fetchStores,
  fetchProducts,
  fetchStoresInventory,
  setCartModalState
})(Supportpage);
