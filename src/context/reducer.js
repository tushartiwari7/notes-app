export const reducer = (state, action) => {
  switch (action.type) {
    case "priority":
      return { ...state, priority: action.payload };
    case "tag":
      return { ...state, tag: action.payload };
    default:
      return state;
  }
};
