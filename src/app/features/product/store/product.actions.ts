import { createAction, props } from '@ngrx/store';
import { Product } from '../../../models/product.model';


export const searchProducts = createAction(
  '[Product] Search Products',
  props<{ searchTerm: string }>()
);

export const searchProductsSuccess = createAction(
  '[Product] Search Products Success',
  props<{ products: Product[] }>()
);

export const searchProductsFailure = createAction(
  '[Product] Search Products Failure',
  props<{ error: string }>()
);

export const clearProducts = createAction('[Product] Clear Products');

// Rehydration actions
export const loadProductsFromStorage = createAction('[Product] Load Products From Storage');
export const saveProductsToStorage = createAction('[Product] Save Products To Storage');