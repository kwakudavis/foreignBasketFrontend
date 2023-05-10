import _ from "lodash";
export default (state = [], action) => {
  //Set variables to handle product and currState
  const product = action.payload;
  let currState = state;
  switch (action.type) {
    case "ADD_TOCART":
      ////// Attempt to find item in Cart
      const queriedProduct = _.find(currState, function (o) {
        return o.productId === product.productId;
      });

      ////////// If product was not found in cart, set product quantity to 1 and add item to cart
      if (queriedProduct === undefined) {
        product.QTY = 1;
        currState = [product, ...state];
      } else {
        /////Otherwise, increase product quantity in cart by 1
        currState = _.forEach(currState, function (o) {
          if (o.productId === product.productId) {
            o.QTY += 1;
            return currState;
          }
        });
      }

      console.log(currState);
      return currState;

    case "REMOVE_FROM_CART":
      //////Check if product is in cart
      const productFetched = _.find(currState, function (o) {
        return o.productId === product.productId;
      });

      /////Condition if product is in Cart
      if (productFetched !== undefined) {
        ///if the product quantity is 1, then remove product from Cart entirely and return Cart

        if (productFetched.QTY === 1) {
          currState = _.reject(currState, function (o) {
            return o.productId === product.productId;
          });
          return currState;
        } else {
          ///Otherwise decrease product quantity by 1
          currState = _.forEach(currState, function (o) {
            if (o.productId === product.productId) {
              o.QTY -= 1;
              return currState;
            }
          });
        }
        return currState;
      } else {
        //////return do nothing and return previous state of cart

        return currState;
      }

    case "DELETE_FROM_CART":
      //////Reject product form the collection of products in the cart state.

      currState = _.reject(currState, function (o) {
        return o.productId === product.productId;
      });

      return currState;

    case "SUBMIT_ORDER_FORM":
      //////Empties cart after order has been submitted to server

      currState = [];
      return currState;

    default:
      return state;
  }
};
