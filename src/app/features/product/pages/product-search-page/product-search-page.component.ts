import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectAllProducts, selectProductsError, selectProductsLoading } from '../../store/product.selectors';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { loadInitialProducts } from '../../store/product.actions';

@Component({
  selector: 'app-product-search-page',
  templateUrl: './product-search-page.component.html',
  styleUrls: ['./product-search-page.component.scss'],
  standalone: false
})
export class ProductSearchPageComponent {
  products$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);
    this.store.dispatch(loadInitialProducts());
  }
}