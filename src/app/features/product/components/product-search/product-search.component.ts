import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  standalone: false
})
export class ProductSearchComponent {
  @Output() searchResults = new EventEmitter<any[]>();
  searchControl = new FormControl('');

  constructor(private productService: ProductService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.productService.searchProducts(term || ''))
    ).subscribe(results => this.searchResults.emit(results));
  }
}