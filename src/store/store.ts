import {combineReducers, configureStore} from '@reduxjs/toolkit';
import cartReducer from './cart_slice';
import productReducer from './product_slice';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppStore = typeof store;
export type RootState = typeof rootReducer;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
