export default (state = [], action) => {
  var prevState = state;
  var updatedState = state;

  switch (action.type) {
    case "SIGN_IN":
      
     
      updatedState = state;
      try {
        updatedState.mobile = action.payload.mobile;
        updatedState.address = action.payload.address;
        return updatedState;
      } catch (err) {}

      return state;

    case "SIGNED_OUT":
      return { loginState: false, data: null };

    case "UPDATE_USER_DETAILS":
      // console.log("states");
      // console.log(action.payload);
      updatedState = state;
      updatedState.mobile = action.payload.mobile;
      updatedState.address = action.payload.address;
      return updatedState;

    default:
      return state;
  }
};
