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
      switchMap(({ searchTerm }) =>
        this.productService.searchProducts(searchTerm.trim()).pipe(
          map(response => ProductActions.searchProductsSuccess({
            products: response?.products || []
          })),
          catchError(error => of(ProductActions.searchProductsFailure({
            error: this.getErrorMessage(error)
          })))
        )
      )
    )
  );

  // Load Initial Products Effect
  loadInitialProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadInitialProducts),
      switchMap(() =>
        this.productService.searchProducts('').pipe(
          map(response => ProductActions.searchProductsSuccess({
            products: response?.products || []
          })),
          catchError(error => of(ProductActions.searchProductsFailure({
            error: this.getErrorMessage(error)
          })))
        )
      )
    )
  );

  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Server unavailable';
    }
    if (error.error?.message) {
      return error.error.message;
    }
    return error.message || 'An unknown error occurred';
  }
}