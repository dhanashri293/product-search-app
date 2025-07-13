import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as ProductActions from './product.actions';
import { ProductService } from '../../../services/product.service';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.searchProducts),
      mergeMap((action) => {
        console.log('Dispatching search for:', action.searchTerm);

        return this.productService.searchProducts(action.searchTerm).pipe(
          map((response: any) => {
            console.log('Full API response:', response);
            const products = response?.products || [];
            console.log('Extracted products:', products);

            return ProductActions.searchProductsSuccess({ products });
          }),
          catchError((error) => {
            console.error('Search failed:', error);
            return of(ProductActions.searchProductsFailure({ error: error.message }));
          })
        );
      })
    )
  );

  loadInitialProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadInitialProducts),
      switchMap(() => this.productService.searchProducts('').pipe(
        map((response) => ProductActions.searchProductsSuccess({
          products: response.products || []
        })),
        catchError((error) => of(ProductActions.searchProductsFailure({
          error: error.message
        })))
      ))
    )
  );
}