export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_STORES":
      return action.payload;

    default:
      return state;
  }
};
