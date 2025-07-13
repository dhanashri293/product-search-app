import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { selectAllProducts, selectProductsLoading } from '../../store/product.selectors';
import { loadProductsFromStorage } from '../../store/product.actions';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-product-search-page',
  templateUrl: './product-search-page.component.html',
  styleUrls: ['./product-search-page.component.scss'],
  standalone: false
})
export class ProductSearchPageComponent implements OnInit {
  products$: Observable<any[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select(selectAllProducts).pipe(
      tap(products => console.log('Products from store:', products))
    );

    this.loading$ = this.store.select(selectProductsLoading).pipe(
      tap(loading => console.log('Loading state:', loading))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadProductsFromStorage());
  }
}