import React from "react";
import { Link } from "react-router-dom";
import Frontpageheader from "./components/Frontpageheader";
import { CircleButton, Button } from "ic-snacks";

import "./index.css";
import { connect } from "react-redux";

import { fetchStores } from "./actions";
import { fetchProducts } from "./actions";
import { fetchStoresInventory, setCartModalState } from "./actions";
import { store } from "ic-snacks/dist/esm/components/SVGIcon/icons";
import { showModal } from "./components/isModalActive";
import { startAfter } from "firebase/firestore";

class Frontpage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loader: false };
  }

  componentDidMount() {

    
    Promise.all([
      this.props.fetchStores(),
      this.props.fetchProducts(),
      this.props.fetchStoresInventory()
    ])
      .then(() => {
        this.setState({ loader: true });
      })
      .catch((error) => {
        // Handle any errors during the fetch operations
       
        this.setState({ loader: false });
      });

  }
  


  renderLoadingSign(loaderState) {
    if (!loaderState) {
      return (
        <div style={{ backgroundColor: "transparent", position:"relative",  }}>
        
          <div
            className="ui active inverted dimmer green"
            style={{ backgroundColor: "transparent", borderWidth: 0, marginTop: "-50px"}}
          >
            <div className="ui loader" > </div>
            
            
          </div>

         
          
        </div>
        
      );
    }
  }
  
  



  renderStoreList() {
    return this.props.stores.map((stores) => {
      return (
        <div className="frontstoreCard" 
      
          
        
  
        >
          <div
            style={{
              borderStyle: "solid",
              padding: "5px",
              borderColor: "#06451f",
              borderWidth: "1px",
              borderRadius: "10px",
              width: "70%",
              backgroundColor: "#ffffff",
              boxShadow: "2px 2px rgb(0 0 0 / 20%)",
              backgroundImage: `url(${stores.store_front_background_image})`,
              backgroundSize: '30% auto',
              backgroundPosition:'top right',
              backgroundRepeat: 'no-repeat'
            }}
          >
          
          
            <Link
              to={{
                pathname: "/shop"        
                ,state: {
                  store_name: stores.name,
                  store_id: stores.id,
                  store_address: stores.address,
                 store_inventory_id: stores.inventory_id
                }
              }}
              className="item"
            >
              <div className="content">
                <div className="description">
                  <img
                    className="frontPageStoreCardImage"
                    src={stores.logo_url}
                  ></img>
                </div>
                <div className="frontPageStoreNameAndLocation">
                  <span>{stores.name},</span>

                  <br />
                  <span>
                    {stores.address}

                    <i
                      className="large clock icon "
                      style={{ fontSize: "9px" }}
                    >
                      {" "}
                      8:00-17:00
                    </i>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {showModal(
          this.props.cartModalActive,
          this.props.setCartModalState,
          this.props.cart
        )}
        <div className="ui grid" id="bannerTextGrid">
          <div></div>
          <div className="fourteen wide column" id="bannerText">
            <h5
              style={{
                fontFamily: "Cormorant",
                fontWeight: "900",
                color: "#f2711c",
                fontSize: 40,
                lineHeight: "35px"
              }}
            >
              {" "}
            </h5>
          </div>
          <div></div>
        </div>

        <Frontpageheader />
        <div className="frontPageBottomRow">
          <div className="buyfromLocalShopsPhraseDiv">
            <span className="buyfromLocalShopsPhrase">
            <i class="shipping fast icon large"></i>Currently available only in mainland Malta.
            </span>
          </div>
          <div
            style={{
              marginTop: "25px",
              marginLeft: "20px"
            }}
          >
            <span
              style={{
                fontFamily: "Lato",
                fontWeight: "700",
                color: "#06451f",
                fontSize: "19px",
                lineHeight: "35px",
                marginLeft: "6%"
              }}
            >
              Choose and shop from one of our supermarkets near you.
            </span>
          </div>

          <div className="renderStorelist">
            {this.renderLoadingSign(this.state.loader)}
            {this.props.stores && this.renderStoreList()}

            <div
              style={{
                marginTop: "20px",
                marginLeft: "20px"
              }}
            >
              <span
                style={{
                  fontFamily: "Cormorant",
                  fontWeight: "500",
                  color: "#06451f",
                  fontSize: "18px",
                  lineHeight: "35px",
                  marginLeft: "6%"
                }}
              >
                ... More stores coming soon!
              </span>
            </div>
          </div>
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
})(Frontpage);
