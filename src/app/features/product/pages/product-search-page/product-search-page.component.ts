import { Component } from '@angular/core';

@Component({
  selector: 'app-product-search-page',
  templateUrl: './product-search-page.component.html',
  styleUrl: './product-search-page.component.scss',
  standalone: false
})
export class ProductSearchPageComponent {
  products: any[] = [];
  loading = false;

  updateProducts(products: any[]) {
    this.products = products;
  }
}