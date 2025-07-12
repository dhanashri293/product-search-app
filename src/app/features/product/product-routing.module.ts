import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductSearchPageComponent } from './pages/product-search-page/product-search-page.component';
//import { ProductSearchPageComponent } from '../pages/product-search-page/product-search-page.component';

const routes: Routes = [
  { path: '', component: ProductSearchPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}