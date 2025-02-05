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

      const index = findItemIndex(newItem, state.items);
      if (index !== -1) {
        return;
      }

      state.items = [...state.items, newItem];
      state.total = calculateTotal(state.items);
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const targetItem: CartItem = action.payload;

      const index = findItemIndex(targetItem, state.items);
      if (index === -1) {
        return;
      }

      state.items.splice(index, 1);
      state.total = calculateTotal(state.items);
    },
    increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const target: CartItem = action.payload;

      const index = findItemIndex(target, state.items);
      if (index === -1) {
        return;
      }

      state.items[index].quantity = target.quantity + 1;
      state.total = calculateTotal(state.items);
    },
    subtractQuantity: (state, action: PayloadAction<CartItem>) => {
      const target: CartItem = action.payload;

      if (target.quantity === 1) {
        return;
      }

      const index = findItemIndex(target, state.items);
      if (index === -1) {
        return;
      }

      state.items[index].quantity = target.quantity - 1;
      state.total = calculateTotal(state.items);
    },
  },
});

function findItemIndex(item: CartItem, cart: Array<CartItem>): number {
  return cart.findIndex(e => e.product.id === item.product.id);
}

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
