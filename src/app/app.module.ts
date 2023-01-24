import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { ProductListComponent } from './products/components/product-list/product-list.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ProductsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
