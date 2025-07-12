// src/app/features/product/product.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductSearchPageComponent } from './pages/product-search-page/product-search-page.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [
    ProductSearchComponent,
    ProductListComponent,
    ProductSearchPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductSearchPageComponent
  ]
})
export class ProductModule {}