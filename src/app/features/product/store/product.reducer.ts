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

on(ProductActions.searchProductsSuccess, (state, { products }) => {
  return {
    ...state,
    products,
    loading: false,
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