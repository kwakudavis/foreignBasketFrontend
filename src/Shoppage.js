import React from "react";
import _ from "lodash";
import Shoppageheader from "./components/Shoppageheader";

import DisplayProductResults from "./components/DisplayProductResults";
import "./index.css";
import { fetchStoresInventory, setCartModalState } from "./actions";
import { connect } from "react-redux";
import { CartModal } from "./Cartmodal";
import { showModal } from "./components/isModalActive";
import  ScrollButton  from "./components/ScrollButton";

class Shoppage extends React.Component {
  store_name = " ";
  store_address = " ";
  store_id = " ";
  store_inventory_id = " ";
  selectedStoresInventory = [];
  constructor(props) {
    super(props);

    this.state = {
      searchedTerm: "",
      selectedCategory: "Categories",

      categoryOptions: [
        "Categories",
        "meat and seafood",
        "condiments",
        "drinks and beverages",
        "fruits and vegetables",
        "grain, flour and cereal",
        "snacks and confectionaries",
        "beauty and household"
      ]
    };

    ///Redirect to front page if the  shop url was entered directly into address bar, else set header values

    try {
      if (this.props.location.state === undefined) {
        this.props.history.push("/");
      } else {
        this.store_name = this.props.location.state.store_name;
        this.store_address = this.props.location.state.store_address;
        this.store_id = this.props.location.state.store_id;
        this.store_inventory_id = this.props.location.state.store_inventory_id;
      }
    } catch (err) {}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /** *
  showModal() {
    if (true) {
      return (
        <CartModal
          open={this.state.open}
          onDismiss={() => this.setState({ open: false })}
          title="Order"
          content="There are no items in your cart"
          actions={<div className="ui teal button">Submit Order</div>}
        />
      );
    }
  }*/

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  handleChange(event) {
    this.setState({ searchedTerm: event.target.value });
  }

  handleSubmit(event) {
    console.log("search term has been submitted", this.state.searchedTerm);
    event.preventDefault();
  }

  handleUpdateSelectedCategory(event) {
    try {
      var value = event.target.value;

      this.setState({ selectedCategory: value });
    } catch (err) {
      console.log(err);
    }
  }

  displayBanner() {
    return (
      <div className="shoppageheaderDiv">
        <Shoppageheader
          store_name={this.store_name}
          store_address={this.store_address}
        />
      </div>
    );
  }

  displaySearchBar() {
    return (
      <div className="searchBar">
        <div className="ui category search">
          <div className="ui icon input">
            <form onSubmit={this.handleSubmit}>
              <input
                className="prompt"
                type="text"
                placeholder="Search product"
                value={this.state.searchedTerm}
                onChange={this.handleChange}
              />
            </form>
            <i className="search icon"></i>
          </div>
          <div className="results"></div>
        </div>
      </div>
    );
  }

  renderOptions(categories) {
    return categories.map((option) => {
      return <option value={option}>{option}</option>;
    });
  }

  displayCategories() {
    return (
      <div className="categories">
        <div className="ui orange buttons">
          <div className="ui form ">
            <div className="field">
              <select multiple="" className="categories">
                <option value="">Categories</option>
                <option value="AF">Flours & Wheats</option>
                <option value="AX">Canned foods</option>
                <option value="AL">Vegetables</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //// Function to get the inventory of the store
  store_inventory = () => {
    return this.props.inventories.map((inventory) => {
      /**   if (inventory.id === this.store_inventory_id) {
        //this.setState({ store_inventory: inventory });
        //  console.log(inventory.inventory[0].productId);
        // console.log(inventory.inventory);
        return inventory.inventory;
      }*/

      return null;
    });
  };

  ////// Display product results
  displayProducts(searchTerm) {
    //Get ID of selected store
    const storesId = this.store_inventory_id;
    ///Filter through inventory list to get selected store's inventory
    this.selectedStoresInventory = _.filter(this.props.inventories, function (
      o
    ) {
      return o.id === storesId;
    });

    if (this.selectedStoresInventory[0] !== undefined) {
      //// Fetch products from inventory
      this.inventory = this.selectedStoresInventory[0].inventory;
    }

    ///Get list of products
    const products = this.props.products;

    let results = [];
    //Iterate through each product in the store's inventory.

    _.forEach(this.inventory, function (value) {
      //Get product's name and image url
      let productdetails = _.find(products, function (o) {
        return o.id === value.productId;
      });

      if (productdetails !== undefined) {
        ///// Populate results array with store's products/product details.
        results = _.concat(results, {
          productId: value.productId,
          productName: _.lowerCase(productdetails.name),
          productPrice: value.productPrice,
          productImgUrl: productdetails.imageurl,
          productCategory: _.lowerCase(productdetails.category)
        });
      }
    });

    ///Filter products by category, if a category has been set
    if (this.state.selectedCategory !== "Categories") {
      var tempSelectedCategory = this.state.selectedCategory;
      results = _.filter(results, function (o) {
        return _.includes(o.productCategory, tempSelectedCategory);
      });
    }

    //Filter products by search term, if a search term has been entered
    ///If there is a search term, convert to lowercase
    if (searchTerm) {
      searchTerm = _.lowerCase(searchTerm);
    }

    results = _.filter(results, function (o) {
      return _.includes(o.productName, searchTerm);
    });

    return results;
  }

  render() {
    return (
      <div className="ui grid">
        {showModal(
          this.props.cartModalActive,
          this.props.setCartModalState,
          this.props.cart
        )}
        {this.displayBanner()}

        {this.displaySearchBar()}
        <div className="categories" style={{display:"none"}}>
          <form className="ui teal button">
            <label>
              <select
                defaultValue={this.state.categoryOptions[0]}
                onChange={(e) => {
                  this.handleUpdateSelectedCategory(e);
                }}
              >
                {this.renderOptions(this.state.categoryOptions)}
              </select>
            </label>
          </form>
        </div>
        <DisplayProductResults
          productResults={this.displayProducts(this.state.searchedTerm)}
        />
        <ScrollButton />

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
  setCartModalState
})(Shoppage);
