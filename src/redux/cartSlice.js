import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.products.findIndex(product => product.id === action.payload.id);
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity += 1;
        state.products[existingProductIndex].total += action.payload.price;
      } else {
        state.products.push({ ...action.payload, quantity: 1, total: action.payload.price });
      }
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find(product => product.id === action.payload);
      if (product) {
        product.quantity += 1;
        product.total += product.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(product => product.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        product.total -= product.price;
      }
    },
    clearCart : ()=>{
      return {products : []}
    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity ,clearCart} = cartSlice.actions;

export default cartSlice.reducer;
