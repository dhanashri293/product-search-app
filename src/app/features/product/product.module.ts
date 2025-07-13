import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductSearchPageComponent } from './pages/product-search-page/product-search-page.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';
import { AsyncPipe } from '@angular/common';

@NgModule({
  declarations: [
    ProductSearchComponent,
    ProductListComponent,
    ProductSearchPageComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('productFeature', productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  exports: [
    ProductSearchPageComponent
  ],
})
export class ProductModule { }