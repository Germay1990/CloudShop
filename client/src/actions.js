export const addToCartAction = (item) => {
    return { type: "ADD", data: item };
  };
  
export const removeFromCartAction = (item) => {
    return { type: "REMOVE", data: item };
  };