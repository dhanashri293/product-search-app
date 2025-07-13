import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { initialProductState } from './product.state';

export const productReducer = createReducer(
  initialProductState,

  on(ProductActions.searchProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

// product.reducer.ts
on(ProductActions.searchProductsSuccess, (state, { products }) => {
  console.log('Reducer updating state with products:', products);
  return {
    ...state,
    products, // This should match your action payload
    loading: false,
    lastUpdated: Date.now()
  };
}),

  on(ProductActions.searchProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    products: []
  })),

  on(ProductActions.clearProducts, () => initialProductState)
);