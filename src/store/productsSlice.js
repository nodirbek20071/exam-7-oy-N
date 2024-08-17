import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: { products: [] },
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
    },
    sortProductsByPrice: (state, action) => {
      const sortOrder = action.payload; 
      state.products.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else if (sortOrder === 'desc') {
          return b.price - a.price;
        }else{
          return 0;
        }
      });
    },
  },
});

export const { addProducts, sortProductsByPrice } = productsSlice.actions;
export default productsSlice.reducer;
