import {combineReducers, configureStore} from '@reduxjs/toolkit';
import cartReducer from './cart_slice';

const reducers = combineReducers({
    cart: cartReducer,
});

const store = configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        }),
    },
);

export default store;
