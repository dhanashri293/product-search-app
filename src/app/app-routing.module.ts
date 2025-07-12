import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductSearchPageComponent } from './features/product/pages/product-search-page/product-search-page.component';

const routes: Routes = [
  { path: '', component: ProductSearchPageComponent }, // Default route
  { path: '**', redirectTo: '' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}