import {createSlice} from '@reduxjs/toolkit';
import {getRandomInt} from '../util/util';
import {productCategories, productImages} from '../config/constants';

const initialProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: false,
  message: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    loadProducts: (state, action) => {
      state.loading = true;
      let errorMessage = '';
      const productList = [];

      try {
        const quantity = action.payload;
        if (typeof quantity !== 'number') {
          errorMessage = 'Invalid product quantity passed';
        } else {
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
        }
      } catch (error) {
        console.error(error);
        errorMessage = error.toString();
      }

      state.loading = false;
      state.message = errorMessage;
      state.error = errorMessage !== '';
      state.items = state.error ? [] : productList;
      state.filteredItems = state.items;
    },
    filterProducts: (state, action) => {
      if (!Array.isArray(action.payload)) {
        console.error('Invalid category array provided!');
        return;
      }
      state.loading = true;
      const categories = action.payload;
      if (categories.length === 1 && categories[0] === productCategories[0]) {
        state.filteredItems = state.items;
      } else {
        const filtered = [];
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
