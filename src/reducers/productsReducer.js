export default (state = ["plantain"], action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return action.payload;

    default:
      return state;
  }
};
