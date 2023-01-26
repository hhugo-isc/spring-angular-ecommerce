import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { AppRouter } from './app-router.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRouter, SharedModule, ProductsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
