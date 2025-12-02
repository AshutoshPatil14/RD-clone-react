import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  totalQuantity: localStorage.getItem('totalQuantity') ? JSON.parse(localStorage.getItem('totalQuantity')) : 0,
  totalAmount: localStorage.getItem('totalAmount') ? JSON.parse(localStorage.getItem('totalAmount')) : 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.productId === newItem.productId);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        toast.success(`${newItem.name} quantity updated in cart!`);
      } else {
        state.cartItems.push(newItem);
        toast.success(`${newItem.name} added to cart!`);
      }
      state.totalQuantity += newItem.quantity;
      state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      const itemToRemove = state.cartItems.find(item => item.productId === productIdToRemove);

      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.cartItems = state.cartItems.filter(item => item.productId !== productIdToRemove);
        state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        toast.success(`${itemToRemove.name} removed from cart!`);

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
        localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      }
    },
    increaseQuantity: (state, action) => {
      const productIdToIncrease = action.payload;
      const itemToIncrease = state.cartItems.find(item => item.productId === productIdToIncrease);

      if (itemToIncrease) {
        itemToIncrease.quantity++;
        state.totalQuantity++;
        state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
        localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      }
    },
    decreaseQuantity: (state, action) => {
      const productIdToDecrease = action.payload;
      const itemToDecrease = state.cartItems.find(item => item.productId === productIdToDecrease);

      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity--;
        state.totalQuantity--;
        state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
        localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      } else if (itemToDecrease && itemToDecrease.quantity === 1) {
        // If quantity becomes 0, remove the item
        state.totalQuantity--;
        state.cartItems = state.cartItems.filter(item => item.productId !== productIdToDecrease);
        state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        toast.success(`${itemToDecrease.name} removed from cart!`);

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
        localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      toast.success("Cart cleared!");

      localStorage.removeItem('cartItems');
      localStorage.removeItem('totalQuantity');
      localStorage.removeItem('totalAmount');
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
