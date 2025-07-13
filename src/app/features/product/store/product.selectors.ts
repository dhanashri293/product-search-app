// product.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './product.state';
import { AppState } from './app.state';

export const selectProductFeature = createFeatureSelector<AppState, ProductState>('productFeature');

export const selectAllProducts = createSelector(
  selectProductFeature,
  (state: ProductState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductFeature,
  (state: ProductState) => state.loading
);