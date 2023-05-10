export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_STORESINVENTORY":
      return action.payload;

    default:
      return state;
  }
};
