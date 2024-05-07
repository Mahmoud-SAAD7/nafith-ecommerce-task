import { createSlice } from '@reduxjs/toolkit';

// Function to load cart from local storage
const loadCartFromStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : { products: [] };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.products.findIndex(product => product.id === action.payload.id);
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity += 1;
        state.products[existingProductIndex].total += action.payload.price;
      } else {
        state.products.push({ ...action.payload, quantity: 1, total: action.payload.price });
      }
      // Save updated cart to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      // Save updated cart to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find(product => product.id === action.payload);
      if (product) {
        product.quantity += 1;
        product.total += product.price;
      }
      // Save updated cart to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(product => product.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        product.total -= product.price;
      }
      // Save updated cart to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: () => {
      // Clear cart state and local storage
      localStorage.removeItem('cart');
      return { products: [] };
    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
