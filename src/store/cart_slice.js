import {createSlice} from '@reduxjs/toolkit';

const initialCartState = {
    cart: [],
    total: 0,
};

export const cartSlice = createSlice(
    {
        name: 'cart',
        initialState: initialCartState,
        reducers: {
            addToCart: (state, action) => {
                const newItem = action.payload;
                const currentCart = state.cart;
                const found = currentCart.filter((item) => item.product.id === newItem.product.id);
                if (found.length !== 0) {
                    return;
                }
                // does not exist
                // add
                const newCart = [...currentCart, newItem];
                const total = calculateTotal(newCart);
                state.cart = newCart;
                state.total = total;

            },
            removeFromCart: (state, action) => {
                const target = action.payload;
                let currentCart = state.cart;
                currentCart = currentCart.filter((item) => item.product.id !== target.product.id);
                const total = calculateTotal(currentCart);
                state.cart = [...currentCart];
                state.total = total;
            },
            increaseQuantity: (state, action) => {
                const target = action.payload;
                let currentCart = state.cart;
                const targetIndex = currentCart.findIndex((e) => e.product.id === target.product.id);
                if (targetIndex === -1) {
                    return;
                }
                currentCart[targetIndex] = {
                    product: target.product,
                    quantity: target.quantity + 1,
                };
                const total = calculateTotal(currentCart);
                state.cart = [...currentCart];
                state.total = total;
            },
            subtractQuantity: (state, action) => {
                const target = action.payload;
                let currentCart = state.cart;
                const targetIndex = currentCart.findIndex((e) => e.product.id === target.product.id);
                if (targetIndex === -1) {
                    return;
                }
                currentCart[targetIndex] = {
                    product: target.product,
                    quantity: target.quantity - 1,
                };
                const total = calculateTotal(currentCart);
                state.cart = [...currentCart];
                state.total = total;
            },
        },
    },
);

function calculateTotal(itemsArray) {
    let total = 0;
    for (let i = 0; i < itemsArray.length; i++) {
        const item = itemsArray[i];
        const cost = item.product.price * item.quantity;
        total += cost;
    }
    return total;
}

export const {addToCart, removeFromCart, increaseQuantity, subtractQuantity} = cartSlice.actions;

export default cartSlice.reducer;
