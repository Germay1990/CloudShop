//Reducer
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      let exist = state.find((item) => item.id === Number(action.data.id));

      if (exist) {
        state = state.map((item) =>
          item.id === Number(action.data.id)
            ? { ...item, qty: item.qty + 1 }
            : item
        );
        return state;
      } else {
        return [...state, { ...action.data, qty: 1 }];
      }
    case "REMOVE":
      return state.filter((item) => item.id !== action.data.id);
    default:
      return state;
  }
};

export default cartReducer;
