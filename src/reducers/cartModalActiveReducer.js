export default (state = false, action) => {
  switch (action.type) {
    case "ALTERNATE_STATE":
      const newState = state;
      return !newState;
    default:
      return state;
  }
};
