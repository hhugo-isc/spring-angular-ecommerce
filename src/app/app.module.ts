import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { AppRouter } from './app-router.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRouter, ProductsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
