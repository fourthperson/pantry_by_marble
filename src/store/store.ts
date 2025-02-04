import {combineReducers, configureStore} from '@reduxjs/toolkit';
import cartReducer from './cart_slice.ts';
import productReducer from './product_slice.ts';
import {useDispatch, useSelector} from 'react-redux';

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
