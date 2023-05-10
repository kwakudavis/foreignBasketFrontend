import _ from "lodash";
import { calculateOrderTotal } from "../helperFunctions/calculateOrderTotal";

export const OrderTotal = (props) => {
  return calculateOrderTotal(props.cartItems);
};
