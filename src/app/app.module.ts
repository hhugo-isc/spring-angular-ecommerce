import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { AppRouter } from './app-router.module';
import { SharedModule } from './shared/shared.module';
import { CartModule } from './cart/cart.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRouter, SharedModule, ProductsModule, CartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
