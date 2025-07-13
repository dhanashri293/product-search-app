import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductModule } from './features/product/product.module';
import { productReducer } from './features/product/store/product.reducer';
import { ProductEffects } from './features/product/store/product.effects';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProductModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('productFeature', productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }