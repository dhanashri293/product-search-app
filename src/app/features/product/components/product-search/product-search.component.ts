import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../../../services/product.service';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/product.actions';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  standalone: false
})
export class ProductSearchComponent {
  @Output() loading = new EventEmitter<boolean>();
  @Output() results = new EventEmitter<any[]>();
  searchControl = new FormControl('');

  constructor(private store: Store<AppState>) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      console.log('Dispatching search for:', searchTerm);
      this.store.dispatch(ProductActions.searchProducts({ searchTerm: searchTerm || '' }));
    });
  }
}