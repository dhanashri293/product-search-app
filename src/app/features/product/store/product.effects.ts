import { Injectable, inject } from '@angular/core'; // Add inject
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ProductActions from './product.actions';
import { ProductService } from '../../../services/product.service';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions); // New way to inject
  private productService = inject(ProductService); // New way to inject

  // product.effects.ts
searchProducts$ = createEffect(() => 
  this.actions$.pipe(
    ofType(ProductActions.searchProducts),
    mergeMap((action) => {
      console.log('Dispatching search for:', action.searchTerm);
      
      return this.productService.searchProducts(action.searchTerm).pipe(
        map((response: any) => {
          console.log('Full API response:', response); // Should show your {products: [...]} object
          
          // Extract products array from response
          const products = response?.products || [];
          console.log('Extracted products:', products); // Should show your array
          
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
}