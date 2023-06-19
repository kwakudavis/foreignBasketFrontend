import _ from "lodash";
import jsonplaceholder from "../Apis.js/jsonplaceholder";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { calculateOrderTotal } from "../helperFunctions/calculateOrderTotal";

export const fetchStores = (dispatch, getState) =>
  _.memoize(async (dispatch, getState) => {
    //Fetch list of stores.
    
    const response = await jsonplaceholder.get("/store/all");

    await dispatch({ type: "FETCH_STORES", payload: response.data });
  });

export const fetchProducts = (dispatch, getState) =>
  _.memoize(async (dispatch, getState) => {
    //Test fetching of stores
    const response = await jsonplaceholder.get("/product/all");
   

    await dispatch({ type: "FETCH_PRODUCTS", payload: response.data });
  });

export const fetchInventories = (dispatch, getState) =>
  _.memoize(async (dispatch, getState) => {
    const response = await jsonplaceholder.get("/store/allinventories");

    await dispatch({ type: "FETCH_STORESINVENTORY", payload: response.data });
  });

//////Get the inventory of all the stores, and display that of the store with id store_id using a memoized
//function, hence function is not executed several times.

export const fetchStoresInventory = (store_id, dispatch, getState) =>
  _.memoize(async (dispatch, getState) => {
    ////Fetch all inventory
    await dispatch(fetchInventories());

    

    //////Update store's
  });

/////// Add's an item to user's current cart
export const addToCart = (selectedProduct, dispatch, getState) => {
  const product = selectedProduct;

  return _.memoize(async (dispatch, getState) => {
    //////dispatch ADD_TOCART action with added item as the payload

    await dispatch({ type: "ADD_TOCART", payload: product });
  });
};

///// Delete an item from user's current cart
export const deleteFromCart = (selectedProduct, dispatch, getState) => {
  const product = selectedProduct;

  return _.memoize(async (dispatch, getState) => {
    //////dispatch DELETE_FROM_CART action with added item as the payload
    
    await dispatch({ type: "DELETE_FROM_CART", payload: product });
  });
};

///// Reduce the number of product in a Cart or remove the product entirely, if there is only 1 of it in cart
export const removeFromCart = (selectedProduct, dispatch, getState) => {
  const product = selectedProduct;

  return _.memoize(async (dispatch, getState) => {
    //////dispatch REMOVE_FROM_CART action with added item as the payload

    await dispatch({ type: "REMOVE_FROM_CART", payload: product });
  });
};

///action creater to trigger user sign in
export const signIn = (userDetails, dispatch, getState) => {
  var passedRecs = userDetails;

  return _.memoize(async (dispatch, getState) => {
    const docRef = doc(db, "customers", passedRecs.uid);

    const docSnap = await getDoc(docRef);

    const data = docSnap.data();

    await dispatch({ type: "SIGN_IN", payload: data });
  });
};

///action creater to trigger user sign out
export const signOut = (dispatch, getState) => {
  return _.memoize(async (dispatch, getState) => {
    await dispatch({ type: "SIGNED_OUT" });
  });
};

export const updateUserDetailsInStore = (userDetails, dispatch, getState) => {
  var passedRecs = userDetails;

  return _.memoize(async (dispatch, getState) => {
    const docRef = doc(db, "customers", passedRecs.uid);

    //  if (docRef) {
    //    await updateDoc(docRef, {
    //    mobile: passedRecs.mobile,
    // address: passedRecs.address
    // });
    // } else {
    await setDoc(docRef, {
      mobile: passedRecs.mobile,
      address: passedRecs.address
    });
    // }

    //const docSnap = await getDoc(docRef);

    // const data = docSnap.data();

    await dispatch({ type: "UPDATE_USER_DETAILS", payload: passedRecs });
  });
};

//export const setCartModalState = (dispatch, getState) => {
 // return _.memoize(async (dispatch, getState) => {
 //   await dispatch({ type: "ALTERNATE_STATE" });
  //});
//};

export const setCartModalState = () => async (dispatch) => {
  await dispatch({ type: "ALTERNATE_STATE" });
};

///////// Submits order form to backend server
export const submitOrderForm = (orderDetails, dispatch, getState) => {
  ////Get Cart, Adress and Mobile Number and Submit to Server
  

  return _.memoize(async (dispatch, getState) => {
    try {
      const currentState = getState();
      var customer_id = null;
      if (currentState.loginState.data) {
        customer_id = currentState.loginState.data.uid;
      }
      var orderTotal = calculateOrderTotal(currentState.cart);
      var orderCart = currentState.cart;

      const response = await jsonplaceholder.post("order/place", {
        customer_id: customer_id,
        store_id: "F4cOCHgRVWcxYT1FzWdq",
        orderItems: orderCart,
        orderTotal: orderTotal,
        orderAddress: orderDetails.address,
        orderMobile: orderDetails.mobile,
        orderDeliveryTime: orderDetails.preferredTime,
        orderEmail: orderDetails.email
      });
      
    } catch (err) {
      
    }

    await dispatch({ type: "SUBMIT_ORDER_FORM" });
  });
};
