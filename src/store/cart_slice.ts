import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartItem} from '../types/types.ts';

interface CartState {
  items: Array<CartItem>;
  total: number;
}

const initialCartState: CartState = {
  items: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem: CartItem = action.payload;
      const currentCart = state.items;
      const found = currentCart.filter(
        item => item.product.id === newItem.product.id,
      );
      if (found.length !== 0) {
        return;
      }
      // does not exist
      // add
      const newCart = [...currentCart, newItem];
      const total = calculateTotal(newCart);
      state.items = newCart;
      state.total = total;
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const target: CartItem = action.payload;
      let currentCart = [...state.items];
      currentCart = currentCart.filter(
        item => item.product.id !== target.product.id,
      );
      const total = calculateTotal(currentCart);
      state.items = [...currentCart];
      state.total = total;
    },
    increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const target: CartItem = action.payload;
      let currentCart = state.items;
      const targetIndex = currentCart.findIndex(
        e => e.product.id === target.product.id,
      );
      if (targetIndex === -1) {
        return;
      }
      currentCart[targetIndex] = {
        product: target.product,
        quantity: target.quantity + 1,
      };
      const total = calculateTotal(currentCart);
      state.items = [...currentCart];
      state.total = total;
    },
    subtractQuantity: (state, action: PayloadAction<CartItem>) => {
      const target = action.payload;
      let currentCart = state.items;
      const targetIndex = currentCart.findIndex(
        e => e.product.id === target.product.id,
      );
      if (targetIndex === -1) {
        return;
      }
      currentCart[targetIndex] = {
        product: target.product,
        quantity: target.quantity - 1,
      };
      const total = calculateTotal(currentCart);
      state.items = [...currentCart];
      state.total = total;
    },
  },
});

function calculateTotal(itemsArray: Array<CartItem>): number {
  let total: number = 0;
  for (let i: number = 0; i < itemsArray.length; i++) {
    const item = itemsArray[i];
    const cost = item.product.price * item.quantity;
    total += cost;
  }
  return total;
}

export const {addToCart, removeFromCart, increaseQuantity, subtractQuantity} =
  cartSlice.actions;

export default cartSlice.reducer;
