import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ProductService } from '../../../../services/product.service';

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

  constructor(private productService: ProductService) {
    this.searchControl.valueChanges.pipe(
      tap(() => this.loading.emit(true)),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.productService.searchProducts(term || ''))
    ).subscribe({
      next: (response) => {
        this.results.emit(response);
        this.loading.emit(false);
      },
      error: () => this.loading.emit(false)
    });
  }
}