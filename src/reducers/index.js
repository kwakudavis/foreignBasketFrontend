import { combineReducers } from "redux";
import storeReducer from "./storesReducer";
import { reducer as formReducer } from "redux-form";
import productsReducer from "./productsReducer";
import storesInventory from "./storesInventoryReducer";
import storesInventoryReducer from "./storesInventoryReducer";
import cartReducer from "./cartReducer";
import loginReducer from "./loginReducer";
import cartModalActiveReducer from "./cartModalActiveReducer";

export default combineReducers({
  form: formReducer,
  stores: storeReducer,
  products: productsReducer,
  storesInvetory: storesInventoryReducer,
  cart: cartReducer,
  loginState: loginReducer,
  cartModalActive: cartModalActiveReducer
});
