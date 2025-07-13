import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as ProductActions from './product.actions';
import { ProductService } from '../../../services/product.service';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.searchProducts),
      switchMap(({ searchTerm }) => {
        const term = searchTerm.trim();
        return this.productService.searchProducts(term).pipe(
          map(response => ({
            products: Array.isArray(response?.products) ? response.products : []
          })),
          map(({ products }) => ProductActions.searchProductsSuccess({ products })),
          catchError(error => of(ProductActions.searchProductsFailure({
            error: this.getErrorMessage(error)
          })))
        );
      })
    )
  );

  // Load Initial Products Effect
  loadInitialProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadInitialProducts),
      switchMap(() => this.productService.searchProducts('').pipe(
        tap(response => console.log('[Effect] Initial load response:', response)),
        map(response => {
          const products = Array.isArray(response?.products) ? response.products : [];
          return ProductActions.searchProductsSuccess({ products });
        }),
        catchError(error => {
          console.error('[Effect] Initial load failed:', error);
          const errorMessage = this.getErrorMessage(error);
          return of(ProductActions.searchProductsFailure({
            error: errorMessage
          }));
        })
      ))
    )
  );

  // Helper method for consistent error messages
  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Server unavailable - please check your connection';
    }
    if (error.error?.message) {
      return error.error.message;
    }
    return error.message || 'An unknown error occurred';
  }
}