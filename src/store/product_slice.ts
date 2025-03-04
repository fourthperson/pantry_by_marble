import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getRandomInt} from '../util/util';
import {productCategories, productImages} from '../config/constants';
import {PantryProduct} from '../types/types.ts';

interface ProductState {
  items: Array<PantryProduct>;
  filteredItems: Array<PantryProduct>;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
}

const initialProductsState: ProductState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: false,
  errorMessage: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    loadProducts: (state, action: PayloadAction<number>) => {
      state.loading = true;
      let errorMessage = '';
      const productList = [];

      try {
        const quantity = action.payload;
        // populate products
        for (let i = 0; i < quantity; i++) {
          const catIndex = getRandomInt(1, productCategories.length - 1);
          const imageIndex = getRandomInt(0, productImages.length - 1);
          const category = productCategories[catIndex];

          productList[i] = {
            id: i + 1,
            name: `Product ${i + 1}`,
            category: category,
            image: imageIndex,
            price: getRandomInt(15, 100),
          };
        }
      } catch (error) {
        console.error(error);
        let s = '';
        if (typeof error === 'string') {
          s = error;
        } else if (error instanceof Error) {
          s = error.message;
        }
        errorMessage = s;
      }

      state.loading = false;
      state.errorMessage = errorMessage;
      state.error = errorMessage !== '';
      state.items = state.error ? [] : productList;
      state.filteredItems = state.items;
    },
    filterProducts: (state, action: PayloadAction<Array<string>>) => {
      if (!Array.isArray(action.payload)) {
        console.error('Invalid category array provided!');
        return;
      }
      state.loading = true;
      const categories: Array<string> = action.payload;
      if (categories.length === 1 && categories[0] === productCategories[0]) {
        state.filteredItems = state.items;
      } else {
        const filtered: Array<PantryProduct> = [];
        for (let i = 0; i < categories.length; i++) {
          for (let j = 0; j < state.items.length; j++) {
            if (categories[i] === state.items[j].category) {
              filtered.push(state.items[j]);
            }
          }
        }
        state.filteredItems = filtered;
      }
      state.loading = false;
    },
  },
});

export const {loadProducts, filterProducts} = productSlice.actions;

export default productSlice.reducer;
